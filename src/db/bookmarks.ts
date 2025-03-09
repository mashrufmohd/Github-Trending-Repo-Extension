import * as sqlite3 from 'sqlite3';
import * as path from 'path';
import { Repo } from '../types';

let db: sqlite3.Database;

export function initializeDatabase(storagePath: string) {
  const dbPath = path.join(storagePath, 'bookmarks.db');
  db = new sqlite3.Database(dbPath);
  db.run(`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id INTEGER PRIMARY KEY,
      full_name TEXT,
      description TEXT,
      stargazers_count INTEGER,
      forks_count INTEGER,
      updated_at TEXT,
      created_at TEXT
    )
  `);
}

export async function addBookmark(repo: Repo): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO bookmarks (id, full_name, description, stargazers_count, forks_count, updated_at, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [repo.id, repo.full_name, repo.description, repo.stargazers_count, repo.forks_count, repo.updated_at, repo.created_at],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

export async function getBookmarks(): Promise<Repo[]> {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM bookmarks`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows as Repo[]);
      }
    });
  });
}