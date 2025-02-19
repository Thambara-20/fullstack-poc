import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-unused-vars": "no",
      "no-console": "no",
      "react-hooks/exhaustive-deps": "no",
      "import/no-anonymous-default-export": "no",
      "@typescript-eslint/no-explicit-any": "no",
      "@typescript-eslint/no-unused-vars": "no",
      "no-undef": "no",
      "no-restricted-globals": "no",
      "react/display-name": "no",
      "react/no-unescaped-entities": "no",
      "react/react-in-jsx-scope": 
    },
  },
];

export default eslintConfig;
