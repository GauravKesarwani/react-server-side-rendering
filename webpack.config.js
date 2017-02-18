module.exports = {
  entry: "./src/server/server.js",
  output: {
    path: `${__dirname}/dist`,
    filename: "server.js"
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
