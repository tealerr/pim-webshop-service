import js from "@eslint/js";
import ts from "typescript-eslint";

export default [
    {
        ignores: ["node_modules", "dist"],
    },
    js.configs.recommended,
    ...ts.configs.recommended,
    ...ts.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
                sourceType: "module",
                ecmaVersion: 2020,
            },
            globals: {
                console: "readonly",
                process: "readonly",
            },
        },
        rules: {
            // Code Quality Rules
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-unused-vars": "error",
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/no-inferrable-types": "warn",
            "@typescript-eslint/strict-boolean-expressions": "warn",
            "prefer-const": "error",
            "no-var": "error",

            // Formatting Rules (replacing Prettier)
            indent: ["error", 4],
            quotes: ["error", "single", { avoidEscape: true }],
            semi: ["error", "always"],
            "comma-dangle": ["error", "never"],
            "no-trailing-spaces": "error",
            "eol-last": ["error", "always"],
            "object-curly-spacing": ["error", "always"],
            "array-bracket-spacing": ["error", "never"],
            "max-len": ["warn", { code: 100 }],
        },
    },
];
