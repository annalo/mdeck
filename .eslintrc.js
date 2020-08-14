module.exports = {
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "@typescript-eslint", "jest"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2929,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "import/no-default-export": "error",
    "import/prefer-default-export": "off",
    "linebreak-style": "off",
    "no-debugger": "warn",
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
  },
};
