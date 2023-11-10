/* eslint-disable no-undef */
module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description:
                'Enforce the use of higher-order functions over traditional loops',
            category: 'Best Practices',
            recommended: true,
        },
        messages: {
            PreferHigherOrderFunctions:
                'Prefer higher-order functions over traditional loops',
        },
        schema: [],
    },
    create: function (context) {
        return {
            ForStatement: function (node) {
                context.report({
                    node,
                    messageId: 'PreferHigherOrderFunctions',
                });
            },
        };
    },
};
