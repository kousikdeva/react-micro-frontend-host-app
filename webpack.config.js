const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;
require('dotenv').config(); // Load .env file

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        filename: "[name].[contenthash].js",  // Cache-busting for better performance
        path: path.resolve(__dirname, "dist"),
        clean: true, // Cleans output directory before each build (no need for CleanWebpackPlugin in Webpack 5)
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    // devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true, // Faster rebuilds
                        presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
        new ModuleFederationPlugin({
            name: "hostApp",
            remotes: {
                remoteApp: "remoteApp@http://localhost:3001/remoteEntry.js",
            },
            shared: {
                react: { singleton: true, eager: true },
                "react-dom": { singleton: true, eager: true },
            },
        }),
    ],
    devServer: {
        port: 3000,
        hot: true,         // Enables Hot Module Replacement (HMR)
        open: true,        // Opens the app in the browser automatically
        historyApiFallback: true, // Enables support for React Router
        compress: true,     // Gzip compression for faster load times
        client: {
            overlay: true,  // Shows build errors as an overlay on the browser
        },
    },
};
