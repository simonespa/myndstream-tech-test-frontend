/**
 * @see https://jestjs.io/docs/configuration#options
 * @see https://nextjs.org/docs/app/guides/testing/jest
 */

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ["html-spa"],

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: undefined,

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/datastore/(.*)$": "<rootDir>/src/datastore/$1",
  },

  // A list of paths to modules that run some code to configure or set up the testing framework
  // before each test file in the suite is executed. Since setupFiles executes before the test framework
  // is installed in the environment, this script file presents you the opportunity of running some code immediately
  // after the test framework has been installed in the environment but before the test code itself.
  // https://jestjs.io/docs/configuration#setupfilesafterenv-array
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
