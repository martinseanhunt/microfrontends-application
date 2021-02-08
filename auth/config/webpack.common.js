// inject script tags in to html file
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  module: {
    // Loader to tell webpack to process files as they are imported
    rules: [
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
            // @babel/preset-react - proces jsx
            // @babel/preset-env - convert modern syntax to es5
            // @babel/plugin-transform-runtime - enable async / await and a few other things
            presets: ['@babel/preset-react', '@babel/preset-env'],
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
  ],
}
