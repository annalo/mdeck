module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-typescript",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  plugins: [
    "prettier",
    "react",
    "react-hooks",
    "jsx-a11y",
    "@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  rules: {
    "import/prefer-default-export": "off",
    "linebreak-style": "off",
    "no-debugger": "warn",
    "no-underscore-dangle": "off",
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "react/jsx-sort-props": [
      "error",
      {
        shorthandFirst: true,
        reservedFirst: true,
      },
    ],
    "react/no-unused-prop-types": "off",
  },
};
