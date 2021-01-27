// Funciton to merge together 2 different webpack configs
const { merge } = require('webpack-merge')
// inject script tags in to html file
const HtmlWebpackPlugin = require('html-webpack-plugin')

const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}

module.exports = merge(commonConfig, devConfig)
