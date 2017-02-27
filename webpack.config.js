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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ["es2015"]
        }
      }
    ]
  }
}
