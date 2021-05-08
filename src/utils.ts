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

import { TextDocument } from "vscode";
import { Challenge } from "./challenge";

/** Pattern to lex identifiers from a challenge file. */
const URI_PATTERN = /curriculum([\/\\])challenges\1(.+)\1\d+-(.+?)\1(.+?)\1.+?\.md/i

/** Pattern to get the dashed name of a challenge. */
const DASHED_NAME_PATTERN = /dashedName: (.+)/;

/**
 * @param document Text document to tokenize.
 * @returns The challenge identifiers.
 * @throws {Error} If document is undefined.
 */
export function tokenizeDocument(document: TextDocument) {
  if (!document)
    throw new Error('document can not be null');

  const fileName = document.fileName;
  const dashedName = getDashedNameFromDocument(document);

  return tokenizeChallenge(fileName, dashedName);
}

/**
 * @param fileName Name of the file to tokenize.
 * @returns The challenge identifiers.
 * @throws {Error} If fileName is undefined or empty.
 */
export function tokenizeChallenge(fileName: string, dashedName: string) {
  if (!fileName)
    throw new Error('fileName can not be null');

  const match = URI_PATTERN.exec(fileName);

  if (!match)
    throw new Error('document is not a freeCodeCamp challenge')

  const result: Challenge = {
    language: match[2],
    courseName: match[3],
    sectionName: match[4],
    dashedName: dashedName
  }

  return result;
}

/**
 * @param document A document representing a challenge.
 * @returns The dashed name of the challenge.
 */
export function getDashedNameFromDocument(document: TextDocument) {
  const content = document.getText();
  return getDashedName(content);
}

/**
 * @param content String representing a challenge.
 * @returns The dashed name of the challenge.
 */
export function getDashedName(content: string) {
  const dashedName = DASHED_NAME_PATTERN.exec(content);

  if (!dashedName)
    throw new Error('dashedName not found in document');

  return dashedName[1];
}

/**
 * Build a URL that can be opened in the browser.
 * 
 * @param host The server to open the challenge on. 
 * @param challenge The challenge to open.
 * @returns The URL where the challenge can be completed.
 */
export function buildUrl(host: string, challenge: Challenge) {
  const { language, courseName, sectionName, dashedName } = challenge;

  switch (language) {
    case 'english':
    case 'chinese':
      return `${host}/learn/${courseName}/${sectionName}/${dashedName}`;
    default:
      return `${host}/${language}/learn/${courseName}/${sectionName}/${dashedName}`;
  }
}
