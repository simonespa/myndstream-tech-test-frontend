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
    "^@/datastore/(.*)$": "<rootDir>/src/datastore/$1",
  },

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
