/*
 * Copyright 2021-2021 Seth Falco and Contributors (https://github.com/SethFalco/fccDevTools/graphs/contributors)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
