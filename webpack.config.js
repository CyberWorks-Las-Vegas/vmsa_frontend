const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const WebpackMd5Hash = require("webpack-md5-hash")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// loads config based on what mode were in
const modeConfiguration = env => require(`./utils/build-utils/webpack.${env}`)(env);

// quickly decides which mode were in based on node env
module.exports = ({ mode } = { mode: process.env.NODE_ENV === "production" ? "production" : "development" }) => {
  const isProduction = mode === "production";

  // webpackmerge will help decide between our prod/dev configs on build and overwrite the correct one
  return webpackMerge({
    // sets mode for current env
    mode,
    // checks for entry for webapck
    entry: {
      main: path.resolve("./src/index.js")
    },
    // output for bundled file
    output: {
      publicPath: "/",
      path: path.resolve("./dist"),
      filename: "index.[hash].js"
    },
    resolve: {
      // helps semantic ui load into react
      alias: {
        "react-dom": "@hot-loader/react-dom"
      },
      // helps resolve extensions in react
      extensions: ["*", ".js", ".jsx"]
    },
    module: {
      rules: [
        {
          // FOR BABEL TO TRANSPILE CORRECTLY
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/react'],
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? "production" : "development"
            }
          }
        },
        {
          // for loading html files
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]

        },
        {
          // for loading css files
          test: /\.(css)$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1
              }
            }
          ]
        },
        {
          // for loading modules
          test: /\.(eot|woff|woff2|ttf|svg|png|jp(e*)g)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192,
              fallback: "file-loader",
              name: "images/[name].[hash].[ext]"
            }
          }
        }
      ]
    },
    plugins: [
      // to keep dist folder clean on rebuild
      new CleanWebpackPlugin({
        dry: true
      }),
      // for html files
      new HtmlWebpackPlugin({
        inject: true,
        hash: true,
        template: "./public/index.html",
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
      }),
      // reduces css duplication in bundle
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default',
            {
              discardComments:
              {
                removeAll: true
              }
            }],
        },
        canPrint: true
      }),new ReactLoadablePlugin({
        filename: './dist/react-loadable.json',
      }),
      // to create manifest.json on build
      new WebpackManifestPlugin(),
      // took keep state on reload in dev server 
      new webpack.HotModuleReplacementPlugin(),
      // for hashing
      new WebpackMd5Hash()
    ]
  },
    // second arg for webpack merge
    modeConfiguration(mode)
  );
};
