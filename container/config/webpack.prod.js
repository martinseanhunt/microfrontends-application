// Funciton to merge together 2 different webpack configs
const { merge } = require('webpack-merge')
// Adding module federation plugin to the dev config file because the production setup
// for module federation will be slightly different
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = {
  // JS files get optimised, minified etc
  mode: 'production',
  output: {
    // Whenever we build the project for prod we append the hash of the file to the filename
    // this avoids issues with caching etc.
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new ModuleFederationPlugin({
      // Don't actually need to provide a name for hosts, only remotes but adding
      // here for clarity.
      name: 'container',
      // List different micro-FEs that the container can search to find modules
      remotes: {
        // The key specifies the name we import modules from e.g. [key]/ProductsIndex products/ProductsIndex
        // marketing@http://localhost:8081/remoteEntry.js = ["name" of remote]@[url to remote entry file]

        // We need to use production urls here. for this setup we're putting each FE in a folder with the
        // remote name as the folder name.
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      // Shared deps - see marketing for detailed comments
      shared: [packageJson.dependencies],
    }),
  ],
}

module.exports = merge(commonConfig, prodConfig)