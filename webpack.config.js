const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'

const filename = (ext) => mode === 'development' ? `[name].${ext}` : `[name].[chunkhash].${ext}`

const cssLoaders = (loader) => {
  const loaders = [MiniCssExtractPlugin.loader, 'css-loader']

  if(loader) {
    loaders.push(loader)
  }

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode,
  entry: {
    // youtubeLightbox: './js/libs/youtubeLightbox/youtubeLightbox.js',
    main: './index.js'
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[name][ext]',
    clean: true
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    port: 4200,
    hot: mode === 'development'
  },
  devtool: mode === 'development' ? 'source-map' : false,
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: mode === 'production'
      },
      // scriptLoading: 'module'
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src/img/header/header-bg.jpg'),
    //       to: path.resolve(__dirname, 'dist/images')
    //     }
    //   ],
    // }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript'
            ]
          }
        }
      }
    ]
  }
}