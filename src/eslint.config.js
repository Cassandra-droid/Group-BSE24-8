export default [
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        browser: true,
        es6: true,
      },
    },
    plugins: {
      react: {
        recommended: true,
      },
    },
    rules: {
      // Add custom linting rules here
    },
  },
];
