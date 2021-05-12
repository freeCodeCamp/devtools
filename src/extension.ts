import * as vscode from 'vscode';
import { openInBrowser } from './commands/open-in-browser';

export function activate(context: vscode.ExtensionContext): void {
  console.log('freeCodeCamp Dev Tools extension is now active.');

  const openInBrowserCommand = 'fccDevTools.command.openInBrowser';

  context.subscriptions.push(
    vscode.commands.registerCommand(openInBrowserCommand, openInBrowser)
  );
}

export function deactivate(): void {
  console.log('freeCodeCamp Dev Tools extension is now inactive.');
}
