const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
    parser: "@typescript-eslint/parser",
    "parserOptions": {
        "tsconfigRootDir": ".",
        "project": [
            project
            // "./packages/*/tsconfig.json",
            // "./apps/*/tsconfig.json",
            // "./build/tsconfig.json"
        ]
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/recommended",
        "turbo"
    ],
    env: {
        node: true,
    },
    settings: {
        "import/resolver": {
            typescript: {
                project,
            },
        },
    },
    ignorePatterns: [
        // Ignore dotfiles
        ".*.js",
        "node_modules/",
        "dist/",
    ],
    overrides: [
        {
            files: ["*.js?(x)", "*.ts?(x)"],
        },
    ],
    rules: {
        "@typescript-eslint/brace-style": [
            "error",
            "stroustrup",
            {
                "allowSingleLine": true
            }
        ],
        "@typescript-eslint/semi": [
            "error",
            "always"
        ]
    }
};
