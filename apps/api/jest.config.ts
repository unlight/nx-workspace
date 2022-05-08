const preset = require(__dirname + '/../../jest.preset.js');

module.exports = {
  displayName: 'api',

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
  preset: '../../jest.preset.ts',
};
