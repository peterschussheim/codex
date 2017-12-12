module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['plugin:flowtype/recommended', 'prettier', 'prettier/flowtype'],
  plugins: ['babel', 'flowtype', 'prettier'],
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error'
  }
}
