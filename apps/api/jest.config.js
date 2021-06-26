const preset = require('../../jest.preset.js');

module.exports = {
  displayName: 'api',
  preset: '../../jest.preset.js',
  testMatch: ['**/src/**/*.spec.{ts,tsx}'],
  globals: {
    'ts-jest': {
      ...preset['ts-jest'],
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/api',
  testEnvironment: 'node',
};
