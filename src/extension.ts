import * as vscode from 'vscode';
import { registerCommands } from './commands';
import { initializeDatabase } from './db/bookmarks';

export function activate(context: vscode.ExtensionContext) {
  console.log('Trending Repositories Analyzer is now active!');
  initializeDatabase(context.globalStorageUri.fsPath);
  registerCommands(context);
}

export function deactivate() {}