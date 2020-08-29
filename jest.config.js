module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["**/*.{js,ts,tsx}", "!**/*.d.ts"],
  setupFilesAfterEnv: ["./setupTests.ts"],
  testRegex: ".*\\.test\\.[jt]sx?$",
};
