// babel.config.js
module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-transform-object-rest-spread',
    'babel-plugin-transform-react-jsx'
  ].map(require.resolve),
  presets: ['@babel/preset-env', '@babel/preset-react']
};