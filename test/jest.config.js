module.exports = {
  // https://jestjs.io/docs/configuration#testpathignorepatterns-arraystring
  // Use the <rootDir> string token to include the path to your project's root directory to prevent it from accidentally ignoring all of your files in different environments that may have different root directories.
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
