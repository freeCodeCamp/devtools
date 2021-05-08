/*
 * Copyright 2020-2020 Seth Falco and Contributors (https://gitlab.com/SethFalco/fccdevtools/-/graphs/master)
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
