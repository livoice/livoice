import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import spellcheck from 'eslint-plugin-spellcheck';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', '**/*.graphql'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      spellcheck: spellcheck
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'arrow-body-style': ['error', 'as-needed'],
      'no-return-assign': 'warn',
      'no-unused-expressions': ['off', { allowShortCircuit: true }],
      '@typescript-eslint/no-unused-expressions': ['off', { allowShortCircuit: true }]
    }
  }
);
