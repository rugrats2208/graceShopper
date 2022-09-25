const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  devtool: 'source-map',
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // {
      //   test: /\.svg$/,
      //   use: [
      //     {
      //       loader: 'svg-url-loader',
      //       options: {
      //         limit: 10000,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpeg|jpg|gif|svg)$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
};
