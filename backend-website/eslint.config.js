export default [
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 12,
      globals: {
        node: true,
        es2021: true,
      },
    },
    rules: {
      // Add custom linting rules here
    },
  },
];
