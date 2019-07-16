// babel.config.js
module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
  ].map(require.resolve),
  presets: ['@babel/preset-env', '@babel/preset-react']
};