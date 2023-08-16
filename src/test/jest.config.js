module.exports = {
  testMatch: ['<rootDir>/src/test/unit/**/*.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};