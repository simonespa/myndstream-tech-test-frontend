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
