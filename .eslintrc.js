const { readFileSync } = require("fs");
const stripComments = require("strip-json-comments");

function getCommonJSDoc() {
  const commonContexts = {
    contexts: ["FunctionDeclaration", "TSTypeAliasDeclaration"],
  };
  // test
  return ["warn", commonContexts];
}

/**
 * Obtain the meta-linting config from the base-level project.
 */
const metaLintConfigPath = ".lint.jsonc";

const metaLintConfig = JSON.parse(
  stripComments(readFileSync(metaLintConfigPath, "utf8"))
);

const jsDocRules = {
  /**
   * Enable JSDoc for common Typescript constructs.
   */
  "jsdoc/require-jsdoc": getCommonJSDoc(),
  "jsdoc/require-description": getCommonJSDoc(),
  "jsdoc/require-description-complete-sentence": 1,

  /**
   * Disable JSDoc for particular nonsensical cases
   */
  "jsdoc/require-returns-type": "off",
  "jsdoc/require-param-type": "off",
};

function conditionallyApplyJSDoc(config) {
  if (metaLintConfig.suffer === true) {
    return typeof config === "string" ? [config] : config;
  } else {
    // Return "empty version" of config
    return Array.isArray(config) || typeof config === "string" ? [] : {};
  }
}

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.eslint.json",
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
    },
  },
  plugins: [
    "@typescript-eslint",
    "lodash",
    "unused-imports",
    ...conditionallyApplyJSDoc("jsdoc"),
  ],
  extends: [
    ...conditionallyApplyJSDoc("plugin:jsdoc/recommended"),
    "plugin:prettier/recommended",
    "auto",
  ],
  rules: {
    /**
     * This rule makes it annoying to temporarily disable rules when debugging.
     */
    "eslint-comments/disable-enable-pair": "off",

    /**
     * Disallow unused imports.
     */
    "unused-imports/no-unused-imports-ts": "warn",

    /**
     * Inconvenient when external interfaces disallow static methods. This is
     * valid though - if none of your member functions use `this`, consider not
     * using a class.
     */
    "class-methods-use-this": "off",

    /**
     * Parameters should not be modified by what they're passed into, except for
     * $, which is how user state is modified.
     */
    "no-param-reassign": [
      "error",
      { props: true, ignorePropertyModificationsFor: ["$"] },
    ],

    /**
     * Unused variables should be a warning rather than an error.
     */
    "@typescript-eslint/no-unused-vars": "warn",

    /**
     * Back by popular demand. Allows one to implicitly infer the return type
     * of functions.
     */
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",

    /**
     * This interferes with calling $.listen in a looping context, so it's
     * disabled.
     */
    "no-await-in-loop": "off",

    /**
     * Default importing of Lodash methods leads to destructured members. This
     * is a more convenient setting.
     */
    "lodash/import-scope": [1, "member"],

    /**
     * Prefer chaining to flow/compose-based computation, because the type
     * system is not powerful enough to represents the generics properly.
     */
    "lodash-fp/no-chain": "off",
    "lodash/chaining": [1, "always"],

    /**
     * We prefer exports that are contained within one line for small functions,
     * so we aren't opinionated about usage of default either way.
     */
    "import/prefer-default-export": "off",

    /**
     * This is more appropriate for frontend applications, and precludes needed
     * utilities such as `console.error`.
     */
    "no-console": "off",

    ...conditionallyApplyJSDoc(jsDocRules),
  },
  overrides: [
    {
      files: [".eslintrc.js"],
      env: {
        node: true,
      },
      parserOptions: {
        project: null,
      },
    },
  ],
};
