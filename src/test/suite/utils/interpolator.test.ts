import * as assert from 'assert';
import { interpolateVariables } from '../../../utils/interpolator';

suite('interpolator.ts', () => {

  test('Interpolates single variable', () => {
    const variables = {
      CYPRESS_BASE_URL: 'https://8000-gray-sawfish-y6p8ee38.ws-eu04.gitpod.io'
    };

    const actual = interpolateVariables('${CYPRESS_BASE_URL}', variables);
    const expected = 'https://8000-gray-sawfish-y6p8ee38.ws-eu04.gitpod.io';

    assert.strictEqual(actual, expected);
  });

  test('Interpolates multiple variable', () => {
    const variables = {
      HOST: '0.0.0.0',
      PORT: '8000'
    };

    const actual = interpolateVariables('${HOST}:${PORT}', variables);
    const expected = '0.0.0.0:8000';

    assert.strictEqual(actual, expected);
  });
});
