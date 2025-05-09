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
    ignores: [
      "app/generated/**", // Ignore all generated files, including Prisma generated files
      "**/*.d.ts", // Ignore declaration files which are often auto-generated
      "node_modules/**",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Disable specific rules that are problematic with generated files
      "@typescript-eslint/no-explicit-any": "warn", // Downgrade to warning
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_", 
        "ignoreRestSiblings": true 
      }],
      "@typescript-eslint/no-empty-object-type": "warn", // Downgrade to warning
      "@typescript-eslint/no-unnecessary-type-constraint": "warn", // Downgrade to warning
    }
  }
];

export default eslintConfig;
