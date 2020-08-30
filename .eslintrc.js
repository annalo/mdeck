module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "jest"],
  rules: {
    "@typescript-eslint/no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    "@typescript-eslint/no-var-requires": "warn",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/setupTests.ts", "**/*.test.ts", "**/*.test.tsx"],
      },
    ],

    "import/prefer-default-export": "off",
    // "linebreak-style": "off",
    // "no-debugger": "warn",
    "no-underscore-dangle": "off",
    "no-unused-expressions": "off",
    // "prettier/prettier": [
    //   "error",
    //   {
    //     endOfLine: "auto",
    //   },
    // ],
    // "react/jsx-sort-props": [
    //   "error",
    //   {
    //     shorthandFirst: true,
    //     reservedFirst: true,
    //   },
    // ],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".ts", "tsx"] }],
    "react/prop-types": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".tsx"],
        paths: ["src"],
      },
    },
  },
};
