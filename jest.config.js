module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["**/*.{js,ts,tsx}", "!**/*.d.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testRegex: ".*\\.test\\.[jt]sx?$",
};
