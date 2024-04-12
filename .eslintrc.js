module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
//   'parser': 'babel-eslint',
  'extends': ['next/core-web-vitals', 'plugin:@tanstack/eslint-plugin-query/recommended'],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'module'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'eslint-plugin-next',
    'eslint-plugin-react-hooks',
    'eslint-plugin-query'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
  }
}
