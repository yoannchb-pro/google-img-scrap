import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  rootDir: "test",
  testEnvironment: "node",
  verbose: true,
};

export default config;
