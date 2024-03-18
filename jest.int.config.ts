import { Config } from "jest";

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.int.test.ts"],
  clearMocks: true,
  modulePaths: ["."],
  globalSetup: "./jest.int.setup.ts",
  globalTeardown: "./jest.int.teardown.ts",
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
} as Config;
