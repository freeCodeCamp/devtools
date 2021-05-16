import * as vscode from 'vscode';
import { WorkspaceConfiguration } from 'vscode';
import { buildUrl, tokenizeDocument } from '../utils/challenge-utils';
import { interpolateVariables, interpolateCommands } from '../utils/interpolator';

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

  if (host === '')
    host = defaultHost;
  else if (!host)
    return;

  host = processHost(host, config);

  const url = buildUrl(host, challenge);
  openUrl(url, config);
}

/**
 * Post process of the host. Interpolates varaibles if those
 * settings are enabled, and cleans the URL.
 * 
 * @param host The original host string.
 * @param config The extension settings.
 * @returns A new host string.
 */
function processHost(host: string, config: WorkspaceConfiguration): string {
  const isVariables = config.get('interpolateEnvironmentVariables', true);

  if (isVariables)
    host = interpolateVariables(host);

  const isCommands = config.get('interpolateCommands', false);

  if (isCommands)
    host = interpolateCommands(host);

  if (!host.startsWith('http'))
    host = 'http://' + host;

  return host;
}

/**
 * Open a URL in the browser.
 * 
 * @param url The URL to open in browser.
 * @param config The extension settings.
 */
function openUrl(url: string, config: WorkspaceConfiguration) {
  const isSimpleBrowser = config.get('simpleBrowser', false);

  if (isSimpleBrowser) {
    vscode.commands.executeCommand('simpleBrowser.show', url);
  } else {
    const uri = vscode.Uri.parse(url);
    vscode.env.openExternal(uri);
  }
}
