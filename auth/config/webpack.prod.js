// Funciton to merge together 2 different webpack configs
const { merge } = require('webpack-merge')
// Adding module federation plugin to the dev config file because the production setup
// for module federation will be slightly different
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const prodConfig = {
  mode: 'production',
  output: {
    // Whenever we build the project for prod we append the hash of the file to the filename
    // this avoids issues with caching etc.
    filename: '[name].[contenthash].js',
    // This is the path to the root of this FE in production after it has been built. In this case it's
    // the path to root of this container FE on our s3 bucket
    publicPath: '/auth/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      // The name of our micro front end
      // NOTE: There's a weird bug whith the federatin plugin where we can't use the name we set here as
      // an id of a div... i.e. <div id="marketing" /> and try to select it with a querySelector.
      // it creates a conflict between variable names in the global context because the browser creates a global var
      // with the same name as the ID of the div. this plugin also creates a global variable with the name defined here.
      name: 'auth',
      // The remote entry point to our micro front end. This is a sererate bundle to our
      // regular bundle. They're both created so we can still run our micro front end in isolation (bundled in
      // to dist/main.js). remoteEnty is emitting a second set of files from webpack which are exposed to other
      // micro front ends.

      // filename is the file name of a manifest that the plugin will create which contains all the differnet files
      // and dependencies that this micro front end is exposing via the module federation plugin.
      // Tells other fe services (i.e. our container) how to load
      // resources from this fe service.
      filename: 'remoteEntry.js',
      // telling the plugin which modules are to be exposed and the path on which to expose them. These can then be
      // imported in to modules in other services using [name as defined in host]/[exposes key]
      // e.g. import 'marketing/Marketing'
      exposes: {
        // Now that we're using the bootstrap / index setup and bootstrap is exporting a mount function, we no longer
        // want to expose index. Index will only be used by the service when it's run in isolation.
        './AuthApp': './src/mount',
      },
      // Shared are packages which maight be being used in multiple micro front ends. This makes sure the
      // package only needs to be loaded once by a host if multiple FE's use the package.

      // IMPORTANT NOTE: Marking a package as shared here causes it to be loaded asyncronously by this
      // fe-service so we get an error message if we try to run the development version of this service
      // in isolation (It works fine when being loaded by the container becuase the remoteEntry file handles
      // this automagically.).

      // If the multiple FE's are using significantly different versions (as defined by whatever rules
      // are set in package.json - ^ ~ etc) of the dependancy, the host will load both versios of the
      // dependency to avoid unexpected issues if a particular FE requires a diferent version for a good reason.

      // Can be a simple array defining specific modules to share
      // shared: ['react'],

      // OR we can let webpack handle the sharing of all dependencies automagically!
      shared: [packageJson.dependencies],
    }),
  ],
}

module.exports = merge(commonConfig, prodConfig)
