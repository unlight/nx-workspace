const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/api',
    '<rootDir>/apps/frontend',
    '<rootDir>/apps/vite',
  ],
};
