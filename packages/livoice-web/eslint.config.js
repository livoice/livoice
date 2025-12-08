import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import spellcheck from 'eslint-plugin-spellcheck';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', '**/*.graphql'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        tsconfigRootDir: fileURLToPath(new URL('.', import.meta.url)),
        project: ['./tsconfig.app.json', './tsconfig.node.json']
      }
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
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true }
      ]
    }
  }
);
