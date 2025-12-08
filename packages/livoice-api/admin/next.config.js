const path = require('path');

const packageRoot = path.join(__dirname, '..');

const reactPath = require.resolve('react', { paths: [packageRoot] });
const reactDomPath = require.resolve('react-dom', { paths: [packageRoot] });
const jsxRuntimePath = require.resolve('react/jsx-runtime', { paths: [packageRoot] });
const jsxDevRuntimePath = require.resolve('react/jsx-dev-runtime', { paths: [packageRoot] });
const reactDomServerPath = require.resolve('react-dom/server', { paths: [packageRoot] });
const reactDomClientPath = require.resolve('react-dom/client', { paths: [packageRoot] });

module.exports = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: reactPath,
      'react/jsx-runtime': jsxRuntimePath,
      'react/jsx-dev-runtime': jsxDevRuntimePath,
      'react-dom': reactDomPath,
      'react-dom/client': reactDomClientPath,
      'react-dom/server': reactDomServerPath
    };

    return config;
  }
};


