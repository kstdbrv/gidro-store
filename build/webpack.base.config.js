const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/pages/`
const FOLDERS = fs.readdirSync(PAGES_DIR)
let pages = []
for(let folder of FOLDERS) pages.push(fs.readdirSync(`${PAGES_DIR}/${folder}`).filter(fileneme => fileneme.endsWith('.pug')))
pages = pages.flat()

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    app: ['@babel/polyfill', PATHS.src],
  },
  output: {
    filename: `./${PATHS.assets}js/[name].[chunkhash].js`,
    path: PATHS.dist,
/*     publicPath: '/' */
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
    {
      test: require.resolve('jquery'),
      loader: 'expose-loader',
      options: {
        exposes: ['$', 'jQuery'],
    }
    },
    {
      test: /\.pug$/,
      use: ['pug-loader']
    },
    {
      test: /\.ts$/,
      exclude: '/node_modules/',
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          {
            'plugins': ['@babel/plugin-proposal-class-properties'
            ]
          }]
    }
    },
    {
      test: /\.jsx$/,
      exclude: '/node_modules/',
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          {
            'plugins': ['@babel/plugin-proposal-class-properties'
            ]
          }]
      }
    },
    {
      test: /\.js$/,
      exclude: '/node_modules/',
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          {
            'plugins': ['@babel/plugin-proposal-class-properties'
            ]
          }]
      }
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      include: '/fonts/',
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
/*         outputPath: `${PATHS.assets}fonts`,
        publicPath: `${PATHS.assets}fonts` */
    }
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      exclude: '/fonts/',
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: `${PATHS.assets}images`,
        publicPath: `${PATHS.assets}images`
    }
    },
    {
      test: /\.s[ac]ss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'resolve-url-loader',
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
      /* filename: `${PATHS.assets}css/[name].[contenthash].css` */
    }),
    new CopyWebpackPlugin({
      patterns: [
        /* { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` }, */
        { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
        { from: `${PATHS.src}/static`, to: '' }, 
      ],
    }),
    ...pages.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page.replace(/\.[^.]+$/, '')}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`
    }))
  ],
}