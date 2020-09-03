module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "**/*.{js,ts,tsx}",
    "!**/*.d.ts",
    "!src/*/*/Loadable.{ts,tsx}",
  ],
  moduleNameMapper: {
    "^types(.*)$": "<rootDir>/src/types$1",
    "^components(.*)$": "<rootDir>/src/components$1",
    "^contexts(.*)$": "<rootDir>/src/contexts$1",
    "^utils(.*)$": "<rootDir>/src/utils$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testRegex: ".*\\.test\\.[jt]sx?$",
};
