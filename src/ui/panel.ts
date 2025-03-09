import * as vscode from 'vscode';
import * as path from 'path';
import { addBookmark, getBookmarks } from '../db/bookmarks';

export function createWebviewPanel(context: vscode.ExtensionContext): vscode.WebviewPanel {
  const panel = vscode.window.createWebviewPanel(
    'trendingRepos',
    'Trending Repos',
    vscode.ViewColumn.One,
    { enableScripts: true, localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'dist'))] }
  );

  panel.webview.html = getWebviewContent(panel.webview, context.extensionPath);
  panel.webview.onDidReceiveMessage(
    async message => {
      switch (message.command) {
        case 'getBookmarks':
          const bookmarks = await getBookmarks();
          panel.webview.postMessage({ command: 'bookmarks', data: bookmarks });
          break;
        case 'addBookmark':
          await addBookmark(message.repo);
          const updatedBookmarks = await getBookmarks();
          panel.webview.postMessage({ command: 'bookmarks', data: updatedBookmarks });
          break;
      }
    },
    undefined,
    context.subscriptions
  );

  return panel;
}

function getWebviewContent(webview: vscode.Webview, extensionPath: string): string {
  const scriptUri = webview.asWebviewUri(vscode.Uri.file(path.join(extensionPath, 'dist', 'webview.js')));
  const styleUri = webview.asWebviewUri(vscode.Uri.file(path.join(extensionPath, 'dist', 'styles.css')));
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="${styleUri}" rel="stylesheet">
    </head>
    <body>
      <div id="root"></div>
      <script>
        const vscode = acquireVsCodeApi();
        window.vscode = vscode;
      </script>
      <script src="${scriptUri}"></script>
    </body>
    </html>
  `;
}