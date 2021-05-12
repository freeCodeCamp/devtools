import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

/**
 * https://code.visualstudio.com/api/working-with-extensions/testing-extension#the-test-runner-script
 */
export function run(): Promise<void> {
  const options: Mocha.MochaOptions = {
    color: true,
    ui: 'tdd'
  }

  const mocha = new Mocha(options);

  const testsRoot = path.resolve(__dirname, '..');

  return new Promise((c, e) => {
    glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
      if (err) {
        return e(err);
      }

      files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

      try {
        mocha.run(failures => {
          if (failures > 0) {
            e(new Error(`${failures} tests failed.`));
          } else {
            c();
          }
        });
      } catch (err) {
        e(err);
      }
    });
  });
}
