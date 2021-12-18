/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
 preset: 'ts-jest',
 testEnvironment: 'node',
 clearMocks: true,
 collectCoverage: true,
 coverageDirectory: "coverage",
 coverageProvider: "v8",
 setupFilesAfterEnv: ["jest-extended", "jest-test-performance"],
 testPathIgnorePatterns: [
  "/node_modules/",
  "/dist/",
  // "/Command/",
  // "/Directory/",
  // "/Storage/",
  // "/Tree/",
  "/UI/"
 ],
 verbose: true,
 roots: [
  "<rootDir>"
 ]
};