import * as vscode from 'vscode';
import { buildUrl, tokenizeDocument } from '../utils';

/**
 * Open a challenge in the browser.
 *
 * @param host The host to open the challenge on.
 * @since 0.0.1
 */
export async function openInBrowser(host: string | undefined) {
  const document = vscode.window.activeTextEditor?.document;

  if (!document)
    throw new Error('document can not be null');

  const challenge = tokenizeDocument(document);

  const config = vscode.workspace.getConfiguration('fccDevTools', document.uri);
  const defaultHost = config.get('defaultHost', 'https://freecodecamp.org');

  if (!host) {
    host = await vscode.window.showInputBox({
      placeHolder: defaultHost,
      prompt: "Enter the host URL"
    });
  }

  if (!host)
    host = defaultHost;
  
  if (!host.startsWith('http'))
    host = 'http://' + host;
 
  const url = buildUrl(host, challenge);
  const isSimpleBrowser = config.get('simpleBrowser', false);

  if (isSimpleBrowser) {
    vscode.commands.executeCommand('simpleBrowser.show', url);
  } else {
    const uri = vscode.Uri.parse(url);
    vscode.env.openExternal(uri);
  }
}
