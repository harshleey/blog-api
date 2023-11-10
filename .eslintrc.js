module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: 'eslint:recommended',
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
            rules: {
                'no-console': 'warn',
                'higher-rules/higher-order-func': 'error',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script',
    },
    rules: {
        'no-console': 'warn',
        'higher-rules/higher-order-func': 'error',
    },
    plugins: ['higher-rules'],
};
