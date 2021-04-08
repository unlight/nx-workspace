const base = require('./jest.config.js');

module.exports = {
  ...base,
  testMatch: ['<rootDir>/test/*.spec.ts'],
};
