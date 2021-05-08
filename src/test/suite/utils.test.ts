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

import * as assert from 'assert';
import { getDashedName, tokenizeChallenge } from '../../utils';

suite('utils.ts', () => {

  test('No exception on Linux', () => {
    assert.doesNotThrow(() => {
      tokenizeChallenge('/home/example/Desktop/freeCodeCamp/curriculum/challenges/english/01-responsive-web-design/basic-css/specify-how-fonts-should-degrade.md', 'specify-how-fonts-should-degrade')
    });
  });

  test('No exception on Windows', () => {
    assert.doesNotThrow(() => {
      tokenizeChallenge('C:\\Users\\example\\Desktop\\freeCodeCamp\\curriculum\\challenges\\english\\03-front-end-libraries\\jquery\\change-the-css-of-an-element-using-jquery.md', 'change-the-css-of-an-element-using-jquery')
    });
  });

  test('Tokenizes path on Linux', () => {
    const challenge = tokenizeChallenge('/home/example/freeCodeCamp/curriculum/challenges/english/08-data-analysis-with-python/data-analysis-with-python-projects/demographic-data-analyzer.md', 'demographic-data-analyzer');
    
    assert.strictEqual('english', challenge.language);
    assert.strictEqual('data-analysis-with-python', challenge.courseName);
    assert.strictEqual('data-analysis-with-python-projects', challenge.sectionName);
    assert.strictEqual('demographic-data-analyzer', challenge.dashedName);
  });

  test('Tokenizes path on Linux', () => {
    const challenge = tokenizeChallenge('C:\\Users\\example\\Desktop\\freeCodeCamp\\curriculum\\challenges\\english\\10-coding-interview-prep\\data-structures\\check-if-binary-search-tree.md', 'check-if-tree-is-binary-search-tree');
    
    assert.strictEqual('english', challenge.language);
    assert.strictEqual('coding-interview-prep', challenge.courseName);
    assert.strictEqual('data-structures', challenge.sectionName);
    assert.strictEqual('check-if-tree-is-binary-search-tree', challenge.dashedName);
  });

  test('Get dashed name from challenge', () => {
    const test = `---\nid: 587d7fb5367417b2b2512c02\ntitle: Use the Tilde-Character to Always Use the Latest Patch Version of a Dependency\nchallengeType: 2\nforumTopicId: 301532\ndashedName: use-the-tilde-character-to-always-use-the-latest-patch-version-of-a-dependency\n---`
    
    const actual = getDashedName(test);
    const expected = 'use-the-tilde-character-to-always-use-the-latest-patch-version-of-a-dependency';

    assert.strictEqual(actual, expected);
  });
});
