module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: [
    '<rootDir>/src/**/*.spec.ts'
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/main.ts',
    '!src/polyfills.ts',
    '!src/environments/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text-summary', 'lcov'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular'
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(@angular|rxjs)/)'
  ]
};
