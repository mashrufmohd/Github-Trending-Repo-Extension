import * as vscode from 'vscode';
import { createWebviewPanel } from './ui/panel';
import { fetchRepoDetails } from './api/githubAPI';

export function registerCommands(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('Trending-Repositories-Tracker.openWidget', () => {
      console.log('Opening Webview...');
      createWebviewPanel(context);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('Trending-Repositories-Tracker.analyzeRepo', async () => {
      const repoInput = await vscode.window.showInputBox({ prompt: 'Enter GitHub repo (e.g., facebook/react)' });
      if (repoInput) {
        const [owner, repo] = repoInput.split('/');
        try {
          const details = await fetchRepoDetails(owner, repo);
          vscode.window.showInformationMessage(`Repo: ${details.full_name}, Stars: ${details.stargazers_count}, Forks: ${details.forks_count}`);
        } catch (err) {
          vscode.window.showErrorMessage(`Error: ${(err as Error).message}`);
        }
      }
    })
  );
}