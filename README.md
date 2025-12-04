# Myndstream Tech Test Frontend

This is a [Next.js](https://nextjs.org) project built for the [Myndstream](https://myndstream.com/) technical test interview. Read the [task](./task.md) for details on the technical test and []

## Getting Started

Clone the repo, then install the dependencies

```bash
pnpm install
```

Once setup, you can either run the development server with `pnpm dev` or you can build the app first with `pnpm build` and then start the production version with `pnpm start`. In both cases, you finally open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

In development mode, the app will auto-update as you edit any file.

## Code Quality

To guarantee code quality, this project uses:
- [ESlint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io/) for code formatting
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Jest](https://jestjs.io/) for unit testing
- [Playwright](https://playwright.dev/) for end-to-end and browser testing

All of these are automated using GitHub Workflow. Other automation set on the repository are:
- Weekly dependency check and upgrade using Dependabot
- Code scan and secret scan using CodeQL
- PR checks that automates the code-quality tasks listed above.

### Linting and Formatting

The default behaviour of both the linter and formatter is "fix" mode. Files will be automatically linted and formatted when you run `pnpm lint` or `pnpm format`. There is also a "check" mode which can be run with `lint:check` or `format:check`. This mode is used by GitHub Workflow to validate the PRs. No fix are applied and the command will fail if an error is encountered.

In addition to the manual command that can be run by the developer, an automatic trigger has been set to run the commands automatically on commit, using the `pre-commit` hook. This setup has been implemented by using `lint-staged` npm module to automate the command to be run and `husky` to manage the Git hooks. This allows code quality at PR level.

### Testing

This project has been setup with Jest to run unit testing and React component testing (a specific type of unit testing); and with Playwright to run end-to-end and browser testing. The repo has a couple of examples to show how a Jest and Playwright test would look like and how it's setup.

### Playwright: commands

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

Visit https://playwright.dev/docs/intro for more information. ✨
