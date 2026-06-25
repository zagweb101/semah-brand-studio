/**
 * يشغّل خادم PostgreSQL مدمج (embedded-postgres) على المنفذ 5432.
 * يعمل على Windows و Linux و macOS (يكتشف المنصة تلقائيًا).
 *
 * التشغيل:  bun run db:start
 * الإيقاف:  Ctrl+C  في نفس الطرفية
 *
 * ملاحظة: البيانات تُحفظ في مجلد .pgdata/ وتُحتفظ بها بين التشغيلات.
 */
import EmbeddedPostgres from "embedded-postgres";
import { mkdirSync, existsSync } from "fs";
import { resolve } from "path";
import { platform, arch } from "os";

const DATA_DIR = resolve(process.cwd(), ".pgdata");
const PORT = 5432;
const DB_NAME = "semah_db";
const USER = "postgres";
const PASSWORD = "postgres";

// اكتشاف المنصة تلقائيًا (لا حاجة لتحديد os/arch يدويًا)
const osName = platform() === "win32" ? "windows" : platform() === "darwin" ? "darwin" : "linux";
const archName = arch() === "arm64" ? "arm64" : "x64";

async function main() {
  console.log(`→ المنصة: ${osName}/${archName}`);

  const isFirstRun = !existsSync(DATA_DIR);
  if (isFirstRun) {
    mkdirSync(DATA_DIR, { recursive: true });
    console.log("→ أول تشغيل: سيتم تهيئة قاعدة البيانات (initdb)…");
  } else {
    console.log("→ بيانات موجودة مسبقًا، تخطّي initdb…");
  }

  const pg = new EmbeddedPostgres({
    databaseDir: DATA_DIR,
    port: PORT,
    user: USER,
    password: PASSWORD,
    persistent: true,
    // اكتشاف تلقائي للـ binary المناسب للمنصة
    pgBuild: {
      os: osName as "linux" | "windows" | "darwin",
      arch: archName as "x64" | "arm64",
      version: "18.4.0",
    },
  });

  if (isFirstRun) {
    await pg.initialise();
  }

  console.log(`→ بدء خادم PostgreSQL على المنفذ ${PORT}…`);
  await pg.start();

  if (isFirstRun) {
    console.log(`→ إنشاء قاعدة البيانات «${DB_NAME}»…`);
    try {
      await pg.createDatabase(DB_NAME, USER);
    } catch (e) {
      // قد تكون موجودة من تهيئة سابقة
      console.log(`   (${e instanceof Error ? e.message.slice(0, 60) : "تخطّي"})`);
    }
  }

  console.log("\n✅ PostgreSQL جاهز:");
  console.log(`   DATABASE_URL=postgresql://${USER}:${PASSWORD}@localhost:${PORT}/${DB_NAME}?schema=public`);
  console.log("   (اضغط Ctrl+C للإيقاف)\n");

  // إيقاف نظيف
  const shutdown = async (sig: string) => {
    console.log(`\n→ ${sig} — إيقاف PostgreSQL…`);
    try {
      await pg.stop();
    } catch {
      /* تجاهل */
    }
    process.exit(0);
  };
  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
  // على Windows، ابحث عن Ctrl+C عبر readline
  if (osName === "windows") {
    process.stdin.resume();
    process.stdin.on("data", () => void shutdown("stdin"));
  }

  // أبقِ العملية حية
  setInterval(() => {}, 1 << 30);
}

main().catch((err) => {
  console.error("✗ فشل بدء PostgreSQL:", err);
  console.error("\nبدائل:");
  console.error("  1) ثبّت PostgreSQL محليًا من https://www.postgresql.org/download/windows/");
  console.error("     ثم حدّث DATABASE_URL في .env للاتصال به.");
  console.error("  2) استخدم Docker: docker run -d --name semah-pg -p 5432:5432 ");
  console.error("     -e POSTGRES_DB=semah_db -e POSTGRES_HOST_AUTH_METHOD=trust postgres:18");
  process.exit(1);
});
