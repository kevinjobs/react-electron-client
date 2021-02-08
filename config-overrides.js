const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = (config, env) => {
  config.target = 'electron-renderer';
  config.resolve.alias = {
    '@': resolve('src')
  };
  return config;
}