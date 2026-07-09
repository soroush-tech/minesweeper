[![License: Prosperity Public License](https://img.shields.io/badge/license-Prosperity%203.0-blue.svg)](https://licensezero.com/licenses/prosperity-3.0)

# Minesweeper

## Monorepo layout

This repository is a pnpm + Turborepo monorepo:

- `apps/web` — the React + TypeScript + Vite app (`@minesweeper/web`)
- `workers/api` — AWS Lambda API (`@minesweeper/api`), currently a skeleton
- `packages/` — reserved for shared code

Run `pnpm <script>` from the repo root (delegates through Turborepo), or
target one package with `pnpm --filter @minesweeper/web <script>`.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Getting Started

To get started with this project, simply run:

```bash
pnpm install
pnpm dev
```

## Available Scripts

In the project directory, you can run:

### `yarn start`yarn start`

Runs the app in the development mode.\

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn preview`

Your app is ready to be deployed! just previewing our app without publishing it, yet. We can use this command at anytime to preview our app.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Learn More

To learn more about Vite, check out the [official documentation](https://vitejs.dev/guide/).

To learn more about React, check out the [official documentation](https://reactjs.org/docs/getting-started.html).

In this example, we've added an introduction to Vite, a brief overview of the app, and instructions for getting started, building for production, and running tests. We've also provided links to the official documentation for both Vite and React.

# Vite ⚡

> Next Generation Frontend Tooling

- 💡 Instant Server Start
- ⚡️ Lightning Fast HMR
- 🛠️ Rich Features
- 📦 Optimized Build
- 🔩 Universal Plugin Interface
- 🔑 Fully Typed APIs
