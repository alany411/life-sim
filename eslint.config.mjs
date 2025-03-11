import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import prettierPluginConfig from 'eslint-plugin-prettier/recommended'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import { dirname } from 'path'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const nextConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      'react/jsx-boolean-value': ['error', 'always'],
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          reservedFirst: true,
          multiline: 'last',
          ignoreCase: true,
          noSortAlphabetically: false,
          locale: 'en',
        },
      ],
    },
  },
]

const typescriptConfig = tseslint.config(
  {
    files: ['**/*.{js,ts,tsx}'],
    plugins: {
      import: importPlugin,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        { allowConstantLoopConditions: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  }
)

const simpleImportSortConfig = [
  {
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
]

const prettierConfig = [prettierPluginConfig]

const eslintConfig = [
  ...nextConfig,
  ...typescriptConfig,
  ...simpleImportSortConfig,
  ...prettierConfig,
]

export default eslintConfig
