# Myndstream Tech Test Frontend

This is a [Next.js](https://nextjs.org) project built for the [Myndstream](https://myndstream.com/) technical test interview (read the [task](./task.md) for further details on the technical test).

## Getting Started

Install the app

```bash
pnpm install
```

### Development

Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The app will auto-update as you edit any file.

### Code Quality

This repo uses:
- [ESlint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io/) for code formatting
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Jest](https://jestjs.io/) for unit testing
- [Playwright](https://playwright.dev/) for end-to-end and browser testing

### Linting and Formatting

The default behaviour of both the linter and formatter is "fix" mode. Files will be automatically linted and formatted when you run `pnpm lint` or `pnpm format`. There is also a "check" mode which can be run with `lint:check` or `format:check`. This mode is used by GitHub Workflow to validate the PRs (no fix is applied).

In addition to the manual command that can be run by the developer, an automatic trigger has been set to run the commands automatically on commit, using the `pre-commit` hook. This setup has been implemented by using `lint-staged` npm module to automate the command to be run and `husky` to manage the Git hooks. This allows code quality at PR level.

### Unit Testing

### E2E Testing

Downloading browsers

```bash
  pnpm exec playwright install
```

Inside that directory, you can run several commands:

```bash
  pnpm exec playwright test
    Runs the end-to-end tests.

  pnpm exec playwright test --ui
    Starts the interactive UI mode.

  pnpm exec playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  pnpm exec playwright test example
    Runs the tests in a specific file.

  pnpm exec playwright test --debug
    Runs the tests in debug mode.

  pnpm exec playwright codegen
    Auto generate tests with Codegen.
```

We suggest that you begin by typing:

```bash
    pnpm exec playwright test
```

And check out the following files:
  - ./tests/example.spec.ts - Example end-to-end test
  - ./playwright.config.ts - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨
