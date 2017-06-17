import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: [
        "react-hot-loader/patch",
        "webpack/hot/only-dev-server",
        "babel-polyfill",
        "whatwg-fetch",
        "./src/index"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "app.[hash].js"
    },
    devtool: "eval",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        ["es2015", {"modules": false}],
                        "stage-0",
                        "react"
                    ],
                    plugins: [
                        "transform-async-to-generator",
                        "transform-decorators-legacy"
                    ]
                }
            },
            {
                test: /\.scss|css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "resolve-url-loader",
                    "sass-loader?sourceMap"
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
                    {
                        loader: "image-webpack-loader",
                        options: {
                            progressive: true,
                            optimizationLevel: 7,
                            interlaced: false,
                            pngquant: {
                                quality: "65-90",
                                speed: 4
                            }
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "file-loader"
            },
            { 
            test: /\.ico$/, 
                loaders: [
                    "file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]",
                    "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false"
                ] 
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ hash: false, template: "./src/index.hbs" }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /nb/)
    ]
};
