module.exports = {
  "env": {
    "browser": true,
    "es2020": true
},
extends: [
  "plugin:react/recommended",
  "airbnb",
  "plugin:prettier/recommended",
  "plugin:@typescript-eslint/eslint-recommended",
  "plugin:@typescript-eslint/recommended"
],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
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
    "react/jsx-sort-props": [
      "error",
      {
        shorthandFirst: true,
        reservedFirst: true,
      },
    ],
    "react/prop-types": "off",
  },
};
