module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "airbnb"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    semi: ["error", "never"],
    quotes: ["error", "double"],
    "max-len": ["error", 120],
    "object-curly-newline": "off",
    "import/extensions": ["error", "never"],
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "import/prefer-default-export": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
    "react/require-default-props": "off",
    "comma-dangle": ["error", "never"],
    "no-restricted-imports": [
      "error",
      { patterns: ["@mui/*/*/*", "!@mui/material/test-utils/*"] }
    ]
  },
  settings: {
    "import/resolver": {
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint
    }
  }
}
