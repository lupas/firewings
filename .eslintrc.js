module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  parser: 'babel-eslint',
  extends: [
    'prettier',
    'eslint:recommended',
    "plugin:prettier/recommended"],
  rules: {
  }
}