const globals = require("globals");
const pluginJs = require("@eslint/js");
const pluginReact = require("eslint-plugin-react");

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended", // Use the recommended configuration for React
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect", // Automatically detects the react version
    },
  },
  rules: {
    // Add your custom rules here
  },
};
