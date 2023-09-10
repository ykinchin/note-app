module.exports = {
  plugins: ['prettier', '@trivago/prettier-plugin-sort-imports'],
  printWidth: 80,
  singleQuote: true,
  jsxSingleQuote: true,
  semi: false,
  tabWidth: 2,
  importOrder: [
    '^react',
    '<THIRD_PARTY_MODULES>',
    '^components/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
