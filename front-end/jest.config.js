const esModules = ['vee-validate'].join('|');

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`]
}
