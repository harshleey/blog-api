# eslint-plugin-higher-rules

Plugin to create rules for higher-order-function

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-higher-rules`:

```sh
npm install eslint-plugin-higher-rules --save-dev
```

## Usage

Add `higher-rules` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": ["higher-rules"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "higher-rules/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

TODO: Run eslint-doc-generator to generate the rules list.

<!-- end auto-generated rules list -->
