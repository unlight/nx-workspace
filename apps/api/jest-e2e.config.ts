const base = require(__dirname + '/jest.config.js');

module.exports = {
  ...base,
  testMatch: ['<rootDir>/test/*.spec.ts'],
  preset: '../../jest.preset.ts',
};
