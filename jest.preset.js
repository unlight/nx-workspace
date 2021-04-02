const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  coverageReporters: ['lcov', 'text'],
  'ts-jest': {
    diagnostics: false,
    isolatedModules: true,
    tsconfig: {
      target: 'es2020',
    },
  },
};
