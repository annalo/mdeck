module.exports = {
  env: {
    "browser": true,
    "es2020": true
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    // "plugin:jest/recommended",
    "prettier",
    // "prettier/react",
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
    "import/prefer-default-export": "off",
    // "linebreak-style": "off",
    // "no-debugger": "warn",
    // "no-underscore-dangle": "off",
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
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".ts", "tsx"] }],
    "react/prop-types": "off",
  },
};
