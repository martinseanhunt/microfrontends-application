// Funciton to merge together 2 different webpack configs
const { merge } = require('webpack-merge')
// inject script tags in to html file
const HtmlWebpackPlugin = require('html-webpack-plugin')
// Adding module federation plugin to the dev config file because the production setup
// for module federation will be slightly different
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      // Don't actually need to provide a name for hosts, only remotes but adding
      // here for clarity.
      name: 'container',
      // List different micro-FEs that the container can search to find modules
      remotes: {
        // The key specifies the name we import modules from e.g. [key]/ProductsIndex products/ProductsIndex
        // marketing@http://localhost:8081/remoteEntry.js = ["name" of remote]@[url to remote entry file]
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
      },
      // Shared deps - see marketing for detailed comments
      shared: [packageJson.dependencies],
    }),
  ],
}

module.exports = merge(commonConfig, devConfig)
