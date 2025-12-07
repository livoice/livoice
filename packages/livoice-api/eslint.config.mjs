import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  js.configs.recommended,
  {
    ignores: ['.keystone/**', 'node_modules/**', 'dist/**', 'build/**', '*.min.js', '*.bundle.js']
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: join(__dirname, 'tsconfig.json'),
        tsconfigRootDir: __dirname
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      '@typescript-eslint/no-namespace': 'off',
      'no-useless-escape': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      'no-unsafe-finally': 'warn',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
      'no-prototype-builtins': 'warn',
      'arrow-body-style': ['error', 'as-needed'],
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn'
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    }
  }
];
