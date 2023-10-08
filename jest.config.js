module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageReporters: ["text", "lcov"],
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["./jest-setup.js"],
  globalSetup: "./__tests__/tests-setup.js",
  globalTeardown: "./__tests__/tests-teardown.js",
};
