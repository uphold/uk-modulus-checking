/**
 * Module dependencies.
 */

import { defineConfig } from 'eslint/config';
import uphold, { mocha as upholdMochaConfig } from 'eslint-config-uphold';

/**
 * `ESLint` configuration.
 */

export default defineConfig([
  uphold,
  { ignores: ['dist/**'] },
  {
    files: ['**/*.js'],
    name: 'uk-modulus-checking/config',
    rules: {
      // Weight table columns are named after single letters in the VocaLink specification.
      'id-length': 'off',
      // Data sets are read from disk once, on instantiation.
      'n/no-sync': 'off'
    }
  },
  {
    extends: [upholdMochaConfig],
    files: ['test/**/*.js'],
    name: 'uk-modulus-checking/tests',
    rules: {
      // Test cases are generated from the VocaLink account number fixtures.
      'mocha/no-setup-in-describe': 'off'
    }
  }
]);
