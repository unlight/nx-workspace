const preset = require('../../jest.preset.js');

module.exports = {
  preset: '../../jest.preset.js',
  displayName: 'api-spec',
  globals: {
    'ts-jest': {
      ...preset['ts-jest'],
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  coverageDirectory: '../../coverage/apps/api-spec',
};
