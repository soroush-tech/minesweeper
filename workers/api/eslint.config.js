import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierRecommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      'prettier/prettier': ['error', { printWidth: 100, endOfLine: 'auto' }],
      '@typescript-eslint/no-explicit-any': 'off',
      'max-len': ['error', { code: 100 }],
    },
  },
)
