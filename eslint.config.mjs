import pluginJs from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import pluginReact from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";
import stylisticJs from "@stylistic/eslint-plugin-js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["./src/**/*.{js, jsx, ts, tsx, mjs}"],
  },
  {
    ignores: [
      ".github/*",
      ".node_modules/*",
      ".next/*",
      ".vscode/*",
      "cypress.config.ts",
      "next.config.js",
      "eslint.config.mjs",
    ],
  },
  {
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      "no-multi-spaces": ["error"],
      quotes: ["error", "single"],
      semi: ["error", "always"],
    },
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-enums": [
        "error",
        {
          forceNumericSort: false,
          ignoreCase: true,
          order: "asc",
          partitionByComment: false,
          partitionByNewLine: false,
          sortByValue: false,
          specialCharacters: "keep",
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-exports": [
        "error",
        {
          groupKind: "mixed",
          ignoreCase: true,
          matcher: "minimatch",
          order: "asc",
          partitionByComment: false,
          partitionByNewLine: false,
          specialCharacters: "keep",
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          customGroups: { type: {}, value: {} },
          environment: "node",
          groups: [
            "type",
            ["builtin", "external"],
            "internal-type",
            "internal",
            ["parent-type", "sibling-type", "index-type"],
            ["parent", "sibling", "index"],
            "object",
            "unknown",
          ],
          ignoreCase: true,
          internalPattern: ["~/**"],
          matcher: "minimatch",
          maxLineLength: undefined,
          newlinesBetween: "always",
          order: "asc",
          specialCharacters: "keep",
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-jsx-props": [
        "error",
        {
          customGroups: {},
          groups: [],
          ignoreCase: true,
          ignorePattern: [],
          matcher: "minimatch",
          order: "asc",
          specialCharacters: "keep",
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-objects": [
        "error",
        {
          customGroups: {},
          groups: [],
          ignoreCase: true,
          ignorePattern: [],
          matcher: "minimatch",
          order: "asc",
          partitionByComment: false,
          partitionByNewLine: false,
          specialCharacters: "keep",
          styledComponents: true,
          type: "alphabetical",
        },
      ],
    },
  },
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      indent: ["error", 4],
      "space-before-function-paren": ["error"],
      "comma-spacing": ["error"],
      "arrow-spacing": ["error"],
      "object-curly-spacing": ["error", "always"],
      "max-len": [
        "error",
        {
          code: 140,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
        },
      ],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
