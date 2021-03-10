module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        "plugin:prettier/recommended"
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        'comma-spacing': 'off',
        'brace-style': 'off',
        'default-param-last': 'off',
        'semi': 'off',
        'comma-dangle': [
            'error',
            'always-multiline'
        ],
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/explicit-function-return-type': ['error'],
        '@typescript-eslint/typedef': 'error',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/lines-between-class-members': 'error',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-extra-parens': 'error',
        '@typescript-eslint/semi': 'error',
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/return-await': [
            'error',
            'never'
        ],
        '@typescript-eslint/keyword-spacing': [
            'error',
            {
                before: true,
                after: true,
            }
        ],
        '@typescript-eslint/comma-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: [
                    'public-static-field',
                    'protected-static-field',
                    'private-static-field',
                    'public-instance-field',
                    'protected-instance-field',
                    'private-instance-field',
                    'constructor',
                    'public-instance-method',
                    'protected-instance-method',
                    'private-instance-method',
                    'public-static-method',
                    'protected-static-method',
                    'private-static-method'
                ]
            }
        ],
        '@typescript-eslint/explicit-member-accessibility': [
            'error', 
            {
                accessibility: 'no-public'
            }
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'default',
                format: ['camelCase'],
                filter: {
                    regex: "^_id$",
                    match: false
                }
            },
            {
                selector: 'variable',
                types: ['boolean'],
                format: ['PascalCase'],
                prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
            {
                selector: 'enumMember',
                format: ['PascalCase'],
            },
        ],
        '@typescript-eslint/quotes': [
            'error',
            'single',
            {
                allowTemplateLiterals: true,
            },
        ],
    },
};
