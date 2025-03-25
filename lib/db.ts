import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "data", "dev.db");

const db = new Database(dbPath, {});
db.pragma("journal_mode = WAL");

export default db;
