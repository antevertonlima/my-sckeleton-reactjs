const path = require('path')
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WriteFilePlugin = require('write-file-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack');
const dotenv = require('dotenv').config()
const dotenvExpand = require('dotenv-expand')
const env = dotenvExpand(dotenv).parsed


//const importsSass = '@import "_variables.scss"; @import "_mixins.scss";'

module.exports= (envi, argv) => {
  
  const devMode = argv.mode !== 'production';
  const NODE_ENV = devMode ? "development" : "production"
  return { 
    devtool: (argv && argv.mode || 'development') === 'production' ? 'source-map' : 'eval',
    mode:devMode ? "development" : "production",
    context: path.join(__dirname, "dist"),
    entry: {
      app:__dirname + '/src/config/app.tsx',
    },
    output: {
      crossOriginLoading: 'anonymous',
      path: path.join(__dirname, './dist/assets/js/'),
      filename: '[name].js',
      publicPath:"/assets/js/",
      hotUpdateChunkFilename: 'hot-update.js',
      hotUpdateMainFilename: 'hot-update.json'
      
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss'],
    },
    optimization: {
      // minimizer: (!devMode ? [new UglifyJsPlugin(UglifyJsPluginOption)] : []),
      minimize: !devMode,
      mangleWasmImports: true,
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true
    },
    plugins: [
      new CleanWebpackPlugin([
        './dist/assets/js/precache-manifest.*',
        './dist/assets/js/*.hot-update.js',
        './dist/assets/js/*.hot-update.js.map',
        './dist/assets/**/*.map',
        './dist/assets/css/app.css',
        './dist/assets/fonts/*',
      ]),
      new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(NODE_ENV)}),
      new Dotenv(),
      new MiniCssExtractPlugin({
        filename: '../css/app.css',
        chunkFilename: '../css/app.css',
      }),
      new WriteFilePlugin({
        // Write only files that have ".css" extension.
        test: /\.(css|js|map|(woff(2)?|ttf|eot|svg))$/,
        useHashIndex: !devMode
      }),
    ],
    module: {
      rules: [
        {
          test: /\.ts|\.tsx|\.js|\.jsx$/,
          exclude: path.resolve(__dirname, './node_modules'),
          use: ['babel-loader', 'awesome-typescript-loader'],
        },
        {
          test: /\.(scss|sass|css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: (()=>{
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                // if(!devMode){
                //   return undefined
                // }
                return{
                  publicPath: '../css'
                } 
              })()
            },
            {
              loader: 'css-loader',
              options: { 
                minimize: !devMode,
                sourceMap:devMode
              }
            },
            {
              loader: 'postcss-loader',
              options:{
                plugins: [
                  require('autoprefixer'),
                  require('cssnano')({
                    discardComments: { removeAll: !devMode },
                  })
                ]
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: devMode,
                // data: importsSass,
                includePaths: [path.resolve(__dirname, "src/assets/scss/")],
                outputStyle: 'compressed',
              }
            },
            'import-glob'
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                useRelativePath:true,
                publicPath: '../fonts/',
                outputPath: '../',
                name (file) {
                  return '[name].[ext]'
                }
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: !devMode,
                  quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled:  !devMode,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced:  !devMode,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75
                }
              }
            },
          ]
        },
      ]
    },
    performance: {
      maxEntrypointSize: 4000 * 1024, //4mb
      maxAssetSize: 4000 * 1024 //4mb
    },
    stats: {
      // Disable the verbose output on build
      children: !devMode,
    },
    devServer: {
      // hot:false,
      
      contentBase: path.join(__dirname,'/dist'),
      publicPath: '/',
      index:"index.html",
      historyApiFallback: {
        index:`${env.URL_APP}/index.html`,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      },
      //dist:'4f87c043.ngrok.io',
      compress: true,
      disableHostCheck: true,
      port:`${env.PORT_APP}`,
      host:`${env.HOST_APP}`,
    }
  }
}
