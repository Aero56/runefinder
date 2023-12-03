module.exports = {
  extends: ['plugin:playwright/recommended', '../.eslintrc.cjs'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {},
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {},
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {},
    },
    {
      files: ['src/**/*.{ts,js,tsx,jsx}'],
      rules: {},
    },
  ],
};
