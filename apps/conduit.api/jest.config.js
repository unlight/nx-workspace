const preset = require('../../jest.preset.js');

module.exports = {
  displayName: 'conduit.api',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      ...preset['ts-jest'],
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/conduit.api',
};
