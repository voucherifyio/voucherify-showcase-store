module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  "parser": "babel-eslint",
  'extends': [
    'plugin:react/recommended',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'prefer-const': ['error', {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false,
    }],
    "no-invalid-this": 0,
    'require-jsdoc': 0,
    'max-len': ["error", { "code": 125 }],
    'quotes': ["error", "single"],
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
};
