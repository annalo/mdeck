module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "**/*.{js,ts,tsx}",
    "!**/*.d.ts",
    "!src/*/*/Loadable.{ts,tsx}",
  ],
  moduleNameMapper: {
    "^components(.*)$": "<rootDir>/src/components$1",
    "^utils(.*)$": "<rootDir>/src/utils$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testRegex: ".*\\.test\\.[jt]sx?$",
};
