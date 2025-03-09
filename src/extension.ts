import * as vscode from 'vscode';
import { registerCommands } from './commands';
import { initializeDatabase } from './db/bookmarks';

export function activate(context: vscode.ExtensionContext) {
  console.log('Trending Repositories Tracker is now active!');
  initializeDatabase(context.globalStorageUri.fsPath); // Initialize SQLite DB
  registerCommands(context);
}

export function deactivate() {}