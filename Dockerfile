# ─────────────────────────────────────────────────────────────
# SEMAH AI Brand Studio — Production Dockerfile (multi-stage)
# ─────────────────────────────────────────────────────────────
# Builder uses Bun for fast installs & builds; runner uses a
# minimal node:22-alpine image running the Next.js standalone
# server (server.js) on port 3000.
# ─────────────────────────────────────────────────────────────

# ── Stage 1: deps ────────────────────────────────────────────
# Install all dependencies (including devDependencies needed to
# build: prisma, next, typescript, tailwind, ...). Bun is much
# faster than npm/yarn for cold installs.
FROM oven/bun:1 AS deps
WORKDIR /app

# Copy lockfile + manifest first to leverage Docker layer cache.
COPY package.json bun.lock ./

# --frozen-lockfile ensures CI-grade reproducibility.
RUN bun install --frozen-lockfile

# ── Stage 2: builder ────────────────────────────────────────
# Compile the Next.js app into a standalone output (.next/standalone)
# and generate the Prisma Client. The `build` npm script also copies
# .next/static and public/ into .next/standalone/ so the runner
# image is fully self-contained.
FROM oven/bun:1 AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Re-copy manifest + lockfile and reinstall to keep this stage
# independent of the deps stage (safer for cache-busting).
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy the rest of the source.
COPY . .

# Generate the Prisma Client (writes to node_modules/.prisma + @prisma/client).
RUN bun run db:generate

# Build Next.js standalone output.
# This runs: next build && cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/
RUN bun run build

# ── Stage 3: runner ─────────────────────────────────────────
# Minimal production image. We only need the Node runtime (the
# standalone server.js is plain Node, no Bun needed at runtime).
# Keeps the final image small (~150MB vs ~1GB).
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as a non-root user for security.
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy the standalone Next.js server.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static assets that the build script placed into standalone.
# (Already included by the build script, but we re-copy defensively
# in case the build script changes.)
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy the Prisma Client engine binaries so the runtime can query the DB.
# These live under node_modules/.prisma and node_modules/@prisma/client.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma/client ./node_modules/@prisma/client

# Keep package.json around (some runtime tools read it).
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

EXPOSE 3000

# Next.js standalone entrypoint.
CMD ["node", "server.js"]
