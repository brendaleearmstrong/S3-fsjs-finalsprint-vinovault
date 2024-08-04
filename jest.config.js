export default {
    transform: {
      "^.+\\.m?js$": "babel-jest"
    },
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.js', '.mjs']
  };