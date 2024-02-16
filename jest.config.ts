import type { Config } from "jest";

const config: Config = {
  collectCoverage: false,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/main/**"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "@shelf/jest-mongodb",
  roots: ["<rootDir>/src"],
  transform: { ".+\\.ts$": "ts-jest" },
  moduleNameMapper: {
    "@/tests/(.*)": "<rootDir>/tests/$1",
    "@/(.*)": "<rootDir>/src/$1",
  },
};

export default config;
