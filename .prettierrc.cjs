module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  printWidth: 80,
  singleQuote: true,
  semi: false,
  importOrder: [
    '^react',
    '<THIRD_PARTY_MODULES>',
    '^components/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
