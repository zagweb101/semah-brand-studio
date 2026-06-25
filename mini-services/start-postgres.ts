/**
 * يشغّل خادم PostgreSQL مدمج (embedded-postgres) على المنفذ 5432
 * للاستخدام المحلي بدلًا من SQLite. يُشغَّل في الخلفية ويبقى حيًا.
 *
 * التشغيل: bun run mini-services/start-postgres.ts &
 */
import EmbeddedPostgres from "embedded-postgres";
import { mkdirSync, rmSync, existsSync } from "fs";
import { resolve } from "path";

const DATA_DIR = resolve(process.cwd(), ".pgdata");
const PORT = 5432;
const DB_NAME = "semah_db";
const USER = "postgres";

async function main() {
  // نظّف دليل البيانات إن وُجد من تشغيل سابق (بدء نظيف)
  if (existsSync(DATA_DIR)) {
    console.log("→ تنظيف دليل البيانات السابق…");
    rmSync(DATA_DIR, { recursive: true, force: true });
  }
  mkdirSync(DATA_DIR, { recursive: true });

  const pg = new EmbeddedPostgres({
    databaseDir: DATA_DIR,
    port: PORT,
    user: USER,
    persistent: true,
    // يحدد مكان الـ binaries
    pgBuild: {
      os: "linux",
      arch: "x64",
      version: "18.4.0",
    },
  });

  console.log("→ تهيئة قاعدة البيانات (initdb)…");
  await pg.initialise();

  console.log(`→ بدء خادم PostgreSQL على المنفذ ${PORT}…`);
  await pg.start();

  console.log(`→ إنشاء قاعدة البيانات «${DB_NAME}»…`);
  await pg.createDatabase(DB_NAME, USER);

  console.log("\n✅ PostgreSQL جاهز:");
  console.log(`   DATABASE_URL=postgresql://${USER}@localhost:${PORT}/${DB_NAME}?schema=public`);
  console.log("   (اضغط Ctrl+C للإيقاف)");

  // ابقَ حيًا
  process.on("SIGINT", async () => {
    console.log("\n→ إيقاف PostgreSQL…");
    await pg.stop();
    process.exit(0);
  });
  process.on("SIGTERM", async () => {
    await pg.stop();
    process.exit(0);
  });

  // أبقِ العملية حية
  setInterval(() => {}, 1 << 30);
}

main().catch((err) => {
  console.error("✗ فشل بدء PostgreSQL:", err);
  process.exit(1);
});
