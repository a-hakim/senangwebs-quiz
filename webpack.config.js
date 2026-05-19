const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = {
  entry: {
    swq: './src/js/swq.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'SWQ',
      type: 'umd',
      export: 'default'
    },
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }
};

module.exports = [
  // Development build (unminified)
  Object.assign({}, baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    output: Object.assign({}, baseConfig.output, {
      filename: '[name].js'
    }),
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'swq.css'
      })
    ]
  }),
  // Production build (minified)
  Object.assign({}, baseConfig, {
    mode: 'production',
    devtool: false,
    output: Object.assign({}, baseConfig.output, {
      filename: '[name].min.js'
    }),
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'swq.min.css'
      })
    ]
  })
];
