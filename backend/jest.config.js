module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '',
  testRegex: '.*\\.steps\\.ts$', // Isso irá garantir que o Jest procure por arquivos que terminem com .steps.ts.
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
};

