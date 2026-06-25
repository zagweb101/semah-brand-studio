#!/usr/bin/env bash
# يشغّل PostgreSQL المدمج مباشرة عبر pg_ctl (مستقل عن عملية bun)
set -e
PG_BIN="/home/z/my-project/node_modules/@embedded-postgres/linux-x64/native/bin"
DATA_DIR="/home/z/my-project/.pgdata"
LOG_FILE="/tmp/pg-server.log"
PORT=5432

# قتل أي postgres سابق
pkill -f "postgres.*$DATA_DIR" 2>/dev/null || true
sleep 1

# تهيئة إن لم يكن الدليل موجودًا
if [ ! -d "$DATA_DIR" ]; then
  echo "→ initdb…"
  "$PG_BIN/initdb" -D "$DATA_DIR" -U postgres --encoding=UTF8 --auth=trust >/dev/null 2>&1
  # ضبط المنفذ
  echo "port = $PORT" >> "$DATA_DIR/postgresql.conf"
  echo "listen_addresses = 'localhost'" >> "$DATA_DIR/postgresql.conf"
fi

# بدء الخادم
echo "→ بدء PostgreSQL على المنفذ $PORT…"
"$PG_BIN/pg_ctl" -D "$DATA_DIR" -l "$LOG_FILE" -o "-i" start

# انتظر حتى يصبح جاهزًا
for i in $(seq 1 15); do
  if "$PG_BIN/pg_isready" -p $PORT -h localhost >/dev/null 2>&1; then
    echo "✅ PostgreSQL جاهز"
    break
  fi
  sleep 1
done

# إنشاء قاعدة البيانات إن لم توجد
"$PG_BIN/psql" -p $PORT -h localhost -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname='semah_db'" | grep -q 1 || {
  "$PG_BIN/createdb" -p $PORT -h localhost -U postgres semah_db
  echo "✅ قاعدة البيانات semah_db منشأة"
}

echo "DATABASE_URL=postgresql://postgres@localhost:$PORT/semah_db?schema=public"
