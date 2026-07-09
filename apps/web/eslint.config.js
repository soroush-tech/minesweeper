import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  { ignores: ['build', 'coverage', 'dist', 'public/mockServiceWorker.js'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat['recommended-latest'],
  reactRefresh.configs.vite,
  prettierRecommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      'prettier/prettier': ['error', { printWidth: 100, endOfLine: 'auto' }],
      '@typescript-eslint/no-explicit-any': 'off',
      'max-len': ['error', { code: 100 }],
    },
  },
)
