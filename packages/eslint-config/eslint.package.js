const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.ut.json");

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
        "out/",
        "snapshot/",
    ],
    overrides: [
        {
            files: ["*.js?(x)", "*.ts?(x)"],
        },
        {
            "files": [
                "*.test.ts"
            ],
            "rules": {
                "@typescript-eslint/no-empty-function": "off",
                "@typescript-eslint/no-unused-vars": "off",
                "@typescript-eslint/no-floating-promises": "off"
            }
        }
    ],
    rules: {
        "@typescript-eslint/comma-dangle": [
            "error",
            "only-multiline"
        ],
        "@typescript-eslint/ban-types": [
            "error"
        ],
        "@typescript-eslint/brace-style": [
            "error",
            "stroustrup",
            {
                "allowSingleLine": true
            }
        ],
        "@typescript-eslint/comma-spacing": "error",
        "@typescript-eslint/consistent-type-definitions": [
            "error",
            "interface"
        ],
        "@typescript-eslint/default-param-last": [
            "error"
        ],
        "@typescript-eslint/dot-notation": [
            "error",
            {
                // Allow unit tests to make assertions about private and protected fields.
                "allowPrivateClassPropertyAccess": true,
                "allowProtectedClassPropertyAccess": true
            }
        ],
        "@typescript-eslint/explicit-module-boundary-types": [
            "error"
        ],
        "@typescript-eslint/func-call-spacing": [
            "error"
        ],
        "@typescript-eslint/indent": [
            // Don't use this rule.  It is broken.
            // See: https://github.com/typescript-eslint/typescript-eslint/issues/1824
            "off"
        ],
        "@typescript-eslint/keyword-spacing": [
            "error",
            {
                "before": true,
                "after": true
            }
        ],
        "@typescript-eslint/lines-between-class-members": [
            "error",
            "always",
            {
                "exceptAfterSingleLine": true,
                "exceptAfterOverload": true
            }
        ],
        "@typescript-eslint/member-ordering": [
            "error",
            {
                "default": [
                    // Static
                    "public-static-field",
                    "protected-static-field",
                    "private-static-field",
                    "#private-static-field",
                    "static-field",
                    "public-static-get",
                    "protected-static-get",
                    "private-static-get",
                    "#private-static-get",
                    "static-get",
                    "public-static-set",
                    "protected-static-set",
                    "private-static-set",
                    "#private-static-set",
                    "static-set",
                    "static-initialization",
                    "public-static-method",
                    "protected-static-method",
                    "private-static-method",
                    "#private-static-method",
                    "static-method",

                    "private-decorated-field",
                    "private-instance-field",
                    "#private-instance-field",
                    "private-field",
                    "#private-field",
                    "protected-decorated-field",
                    "protected-instance-field",
                    "protected-abstract-field",
                    "protected-field",

                    // Constructors
                    "public-constructor",
                    "protected-constructor",
                    "private-constructor",
                    "constructor",

                    // Fields
                    "instance-field",
                    "abstract-field",
                    "decorated-field",
                    "field",

                    "public-decorated-field",
                    "public-instance-field",
                    "public-abstract-field",
                    "public-field",

                    // Index signature
                    "signature",
                    "call-signature",

                    // Getters
                    "get",
                    "instance-get",
                    "decorated-get",
                    "abstract-get",

                    "private-get",
                    "#private-get",
                    "private-decorated-get",
                    "private-instance-get",
                    "#private-instance-get",

                    "protected-get",
                    "protected-decorated-get",
                    "protected-instance-get",
                    "protected-abstract-get",

                    "public-get",
                    "public-decorated-get",
                    "public-instance-get",
                    "public-abstract-get",

                    // Setters
                    "set",
                    "instance-set",
                    "decorated-set",
                    "abstract-set",

                    "private-set",
                    "#private-set",
                    "private-decorated-set",
                    "private-instance-set",
                    "#private-instance-set",

                    "protected-set",
                    "protected-decorated-set",
                    "protected-instance-set",
                    "protected-abstract-set",

                    "public-set",
                    "public-decorated-set",
                    "public-instance-set",
                    "public-abstract-set",


                    // Methods
                    "public-decorated-method",
                    "protected-decorated-method",
                    "private-decorated-method",
                    "public-instance-method",
                    "protected-instance-method",
                    "private-instance-method",
                    "#private-instance-method",
                    "public-abstract-method",
                    "protected-abstract-method",
                    "public-method",
                    "protected-method",
                    "private-method",
                    "#private-method",
                    "instance-method",
                    "abstract-method",
                    "decorated-method",
                    "method"
                ]
            }
        ],
        "@typescript-eslint/naming-convention": [
            "error",
            {
                "selector": "default",
                "leadingUnderscore": "allow",
                "trailingUnderscore": "allow",
                "format": [
                    "camelCase"
                ]
            },
            {
                "selector": "variable",
                "modifiers": [
                    "const",
                    "global"
                ],
                "leadingUnderscore": "allowSingleOrDouble",
                "trailingUnderscore": "allow",
                "format": [
                    "camelCase",
                    "UPPER_CASE"
                ]
            },
            {
                "selector": "variable",
                "leadingUnderscore": "allowSingleOrDouble",
                "trailingUnderscore": "allow",
                "format": [
                    "camelCase"
                ]
            },
            {
                "selector": "typeLike",
                "format": [
                    "PascalCase"
                ]
            },
            {
                "selector": "enumMember",
                // Allow leading underscores for situations where the member
                // would otherwise start with a numeric digit.
                "leadingUnderscore": "allow",
                "format": [
                    "PascalCase",
                    "UPPER_CASE"
                ]
            },
            {
                "selector": "objectLiteralProperty",
                "leadingUnderscore": "allow",
                "trailingUnderscore": "allow",
                "format": [
                    "camelCase",
                    "UPPER_CASE"
                ]
            },
            {
                // Angular module variables (ending in "Module") should be PascalCase
                "selector": [
                    "variable"
                ],
                "filter": {
                    "regex": "^.*Module$",
                    "match": true
                },
                "format": [
                    "PascalCase"
                ]
            },
            {
                "selector": "interface",
                // No longer requiring the "I" prefix, because a type is a type.
                // "prefix": [
                //     "I"
                // ],
                "format": [
                    "PascalCase"
                ]
            },
            {
                "selector": "typeParameter",
                "prefix": [
                    "T"
                ],
                "format": [
                    "PascalCase"
                ]
            },
            {
                "selector": [
                    "classProperty"
                ],
                "modifiers": [
                    "static",
                    "readonly"
                ],
                "format": [
                    "UPPER_CASE"
                ]
            },
            {
                "selector": [
                    "classProperty"
                ],
                "modifiers": [
                    "private"
                ],
                "leadingUnderscore": "require",
                "format": [
                    "camelCase"
                ]
            }
        ],
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-inferrable-types": [
            // There's nothing wrong about being explicit.
            "off"
        ],
        "@typescript-eslint/no-loop-func": [
            "error"
        ],
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": [
            "error"
        ],
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                "vars": "all",
                "varsIgnorePattern": "^[_]{2,}\\w*$", // Unused variables should start with __
                "args": "none", // It's ok to have unused args to b/c they provide signature documentation
                "caughtErrors": "none"
            }
        ],
        "@typescript-eslint/prefer-for-of": [
            "error"
        ],
        "@typescript-eslint/prefer-function-type": [
            "error"
        ],
        "@typescript-eslint/prefer-includes": [
            "error"
        ],
        "@typescript-eslint/prefer-literal-enum-member": [
            "error",
            {
                "allowBitwiseExpressions": true
            }
        ],
        "@typescript-eslint/prefer-optional-chain": [
            "error"
        ],
        "@typescript-eslint/prefer-readonly": [
            "error"
        ],
        "@typescript-eslint/prefer-reduce-type-parameter": [
            "off"
        ],
        "@typescript-eslint/prefer-return-this-type": [
            "error"
        ],
        "@typescript-eslint/prefer-string-starts-ends-with": [
            "error"
        ],
        "@typescript-eslint/prefer-ts-expect-error": [
            "error"
        ],
        "@typescript-eslint/quotes": [
            "error",
            "double",
            {
                "avoidEscape": true,
                "allowTemplateLiterals": true
            }
        ],
        "@typescript-eslint/require-await": "error",
        "@typescript-eslint/semi": [
            "error",
            "always"
        ],
        "@typescript-eslint/space-before-function-paren": [
            "error",
            {
                "anonymous": "always",
                "named": "never",
                "asyncArrow": "always"
            }
        ],
        "@typescript-eslint/type-annotation-spacing": [
            "error"
        ],
        "@typescript-eslint/unbound-method": [
            "error",
            {
                "ignoreStatic": true
            }
        ],
        // When using Angular it is common to have @ViewChildren that only have a setter.
        "accessor-pairs": "off",
        "array-bracket-newline": [
            "error",
            "consistent"
        ],
        "array-bracket-spacing": [
            "error",
            "never"
        ],
        // Turned off because this rule triggers false positives when it sees a
        // lambda that is not returning something in all branches.  In reality,
        // the one branch that doesn't have a "return" has an assertNever().
        "array-callback-return": "off",
        // Sometimes adding curly braces to an arrow function can help, especially when the returned expression is complicated.
        "arrow-body-style": "off",
        "arrow-parens": [
            "error",
            "always"
        ],
        "arrow-spacing": [
            "error",
            {
                "before": true,
                "after": true
            }
        ],
        "block-scoped-var": "error",
        "block-spacing": "error",
        "brace-style": [
            "off"
        ],
        "camelcase": "error",
        "comma-dangle": "off", // Must be off when @typescript-eslint/comma-dangle is on
        "comma-spacing": "off", // Must be off when @typescript-eslint/comma-spacing is on
        "comma-style": [
            "error",
            "last"
        ],
        "computed-property-spacing": [
            "error",
            "never"
        ],
        "consistent-this": [
            "error",
            "self"
        ],
        "curly": "error",
        "default-case-last": "error",
        "default-param-last": "off", // Must be off when @typescript-eslint/default-param-last is on
        "dot-location": [
            "error",
            "property"
        ],
        "dot-notation": "off", // Must be off when @typescript-eslint/dot-notation is on
        "eol-last": "error",
        "eqeqeq": [
            "error",
            "always"
        ],
        "func-call-spacing": "off", // Must be off when @typescript-eslint/func-call-spacing is on
        "func-name-matching": [
            "error",
            "always",
            {
                "considerPropertyDescriptor": true,
                "includeCommonJSModuleExports": true
            }
        ],
        "func-names": "off", // Nameless functions are used frequently in many frameworks such as Express
        "function-paren-newline": [
            "error",
            "consistent"
        ],
        "grouped-accessor-pairs": [
            "error",
            "getBeforeSet"
        ],
        "guard-for-in": "error",
        "implicit-arrow-linebreak": [
            "error",
            "beside"
        ],
        "indent": [
            "error",
            4,
            {
                "ignoredNodes": [
                    "ConditionalExpression"
                ],
                "MemberExpression": 0, // Chaining methods does not require indentation
                "SwitchCase": 1,
                "flatTernaryExpressions": true,
                "ignoreComments": true,
                "FunctionDeclaration": {
                    "parameters": "first"
                },
                "FunctionExpression": {
                    "parameters": "first"
                },
                "CallExpression": {
                    "arguments": "first"
                },
                "ArrayExpression": "first",
                "ObjectExpression": "first",
                "ImportDeclaration": "first"
            }
        ],
        "key-spacing": [
            "error",
            {
                "beforeColon": false,
                "afterColon": true,
                "mode": "minimum",
                "align": {
                    "beforeColon": false,
                    "afterColon": true,
                    "on": "value",
                    "mode": "strict"
                }
            }
        ],
        "keyword-spacing": "off", // Must be off when @typescript-eslint/keyword-spacing is on
        "linebreak-style": "off",
        "lines-between-class-members": "off", // Must be off when @typescript-eslint/lines-between-class-members is on
        "max-len": [
            "error",
            {
                "code": 120,
                "tabWidth": 4,
                "comments": 160,
                "ignoreComments": true,
                "ignoreUrls": true,
                "ignoreStrings": true,
                "ignoreTemplateLiterals": true,
                "ignoreRegExpLiterals": true
            }
        ],
        "new-parens": "error",
        "no-constructor-return": "error",
        "no-duplicate-imports": "error",
        "no-eq-null": "error",
        "no-eval": [
            "error",
            {
                "allowIndirect": true
            }
        ],
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-implicit-coercion": [
            "error",
            {
                "boolean": false,
                "number": true,
                "string": true
            }
        ],
        "no-implied-eval": "error",
        "no-lone-blocks": "error",
        "no-loop-func": "off", // Must be off when @typescript-eslint/no-loop-func is on
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-promise-executor-return": "error",
        "no-return-await": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-template-curly-in-string": "error",
        "no-trailing-spaces": "error",
        "no-underscore-dangle": [
            "off"
        ],
        "no-unmodified-loop-condition": "error",
        "no-unneeded-ternary": "error",
        "no-unreachable-loop": "error",
        "no-unsafe-optional-chaining": [
            "error",
            {
                "disallowArithmeticOperators": true
            }
        ],
        "no-unused-expressions": "off", // Must be off when @typescript-eslint/no-unused-expressions is on
        "no-unused-vars": "off", // Must be off when @typescript-eslint/no-unused-vars is on
        "no-useless-backreference": "error",
        "no-useless-call": "error",
        "no-useless-computed-key": [
            "error",
            {
                "enforceForClassMembers": true
            }
        ],
        "no-useless-rename": "error",
        "no-var": "error",
        // When curly braceless labmdas are passed to immer's produce(), the
        // return value confuses produce into thinking the next state is being
        // returned.  Using the void operator is a good way to prevent this.
        "no-void": "off",
        "no-whitespace-before-property": "error",
        "object-curly-newline": [
            "error",
            {
                "consistent": true
            }
        ],
        "object-property-newline": [
            "error",
            {
                "allowAllPropertiesOnSameLine": true
            }
        ],
        "object-shorthand": [
            "off"
        ],
        "one-var": [
            "error",
            {
                "var": "never",
                "let": "never",
                "const": "never",
                "separateRequires": true
            }
        ],
        "one-var-declaration-per-line": [
            "error",
            "always"
        ],
        // Sometimes regular named functions are preferrable because their name shows up in call stacks.
        "prefer-arrow/prefer-arrow-functions": "off",
        "prefer-const": [
            "error",
            {
                "destructuring": "all"
            }
        ],
        "prefer-named-capture-group": "error",
        "prefer-object-spread": "error",
        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "quotes": "off", // Needs to be off when @typescript-eslint/quotes is on
        "radix": [
            "error",
            "always"
        ],
        "require-atomic-updates": [
            "error"
        ],
        "require-await": "off", // Must be off when @typescript-eslint/require-await is on
        "rest-spread-spacing": "error",
        "semi": "off", // Must be off when @typescript-eslint/semi is on
        "semi-spacing": [
            "error",
            {
                "before": false,
                "after": true
            }
        ],
        "semi-style": [
            "error",
            "last"
        ],
        "space-before-blocks": [
            "error",
            "always"
        ],
        "space-before-function-paren": "off", // Must be off when @typescript-eslint/space-before-function-paren is on
        "space-in-parens": [
            // Sometimes space is inserted in order for similar lines to line up.
            "off"
        ],
        "space-infix-ops": [
            "error"
        ],
        "space-unary-ops": [
            "error",
            {
                "words": true,
                "nonwords": false
            }
        ],
        "spaced-comment": [
            "error",
            "always",
            {
                "exceptions": [
                    "-",
                    "+",
                    "=",
                    "/",
                    "*"
                ],
                "markers": [
                    "/"
                ]
            }
        ],
        "switch-colon-spacing": "error",
        "wrap-iife": [
            "error",
            "any"
        ],
        "import/no-extraneous-dependencies": [
            "error",
            {
                "devDependencies": [
                    "**/*.test.js",
                    "**/*.spec.js"
                ]
            }
        ],
        "import/order": ["error"]
    }
};
