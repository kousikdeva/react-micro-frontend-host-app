const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require('webpack');
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;
require('dotenv').config(); // Load .env file

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
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
    },
};
