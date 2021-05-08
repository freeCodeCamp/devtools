import * as path from 'path';
import { runTests } from 'vscode-test';
import { TestOptions } from 'vscode-test/out/runTest';

async function main() {
  try {
    const testOptions: TestOptions = {
      extensionDevelopmentPath: path.resolve(__dirname, '../../../'),
      extensionTestsPath: path.resolve(__dirname, './suite/index')
    };

    await runTests(testOptions);
  } catch (err) {
    console.error('Failed to run tests\n', err);
    process.exit(1);
  }
}

main();
