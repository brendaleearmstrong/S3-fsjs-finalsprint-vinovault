export default {
    transform: {
      "^.+\\.m?js$": "babel-jest"
    },
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.mjs'],  // Remove '.js' from here
    moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],
  };