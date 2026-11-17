import "dotenv/config";

import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const dbPath = resolve(process.env.DB_PATH || "./data/tasks.db");

mkdirSync(dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL CHECK (
      status IN ('to-do', 'in-progress', 'done')
    ),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

export default db;
