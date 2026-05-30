// Flat-Config (ESLint 9+). Bei TS-Projekten typescript-eslint ergänzen.
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,ts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { window: "readonly", document: "readonly", localStorage: "readonly" },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      eqeqeq: ["error", "smart"],
    },
  },
  { ignores: ["dist/", "node_modules/", "*.config.js"] },
];
