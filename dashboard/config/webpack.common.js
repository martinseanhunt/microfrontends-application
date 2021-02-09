// inject script tags in to html file
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  module: {
    // Loader to tell webpack to process files as they are imported
    rules: [
      // File loader for images / fonts etc
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
        use: [{ loader: 'file-loader' }],
      },
      // loader for vue files
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      // css loader
      {
        test: /\.scss|\.css$/,
        use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader'],
      },
      // Babel loader
      {
        // Whenever we import files ending in .mjs or .js we want it to be processed
        // by babel.
        test: /\.m?js$/,
        // don't run babel on node modules
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // @babel/preset-env - convert modern syntax to es5
            // @babel/plugin-transform-runtime - enable async / await and a few other things
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new VueLoaderPlugin(),
  ],
}
