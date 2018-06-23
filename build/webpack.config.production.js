let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');
module.exports = {
    entry: ['babel-polyfill','./src/index.js'],//入口配置
    output: {
        path: path.join(__dirname, '../dist'),//只能写绝对路径，输出文件夹
        publicPath: "/dist/",
        filename: 'js/[name].[hash].js'//输出文件名
    },
    module: {
        rules: [
            {
                test: /.jsx$/, //使用loader的目标文件。这里是.jsx
                loader: 'babel-loader'
            },
            {
                test: /.(js)$/, //使用loader的目标文件。这里是.js
                //loader: 'babel-loader',
                use:'happypack/loader?id=babel',
                exclude: [
                    path.join(__dirname, '../node_modules')  // 由于node_modules都是编译过的文件，这里我们不让babel去处理其下面的js文件
                ]
            },{
                test: /\.css$/,
                use: extractCSS.extract(['css-loader' ])
            },
            {
                test: /\.less$/,
                // loader: 'style!css',
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap=true!postcss-loader?sourceMap=true!less-loader?{"sourceMap":true}'),
                use: extractLESS.extract([ 'css-loader', 'postcss-loader' ,'less-loader',])
            },
            {
                test: /\.css$/,
                // loader: 'style!css',
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap=true!postcss-loader?sourceMap=true!less-loader?{"sourceMap":true}'),
                use: [
                    'postcss-loader'
                ],
                exclude : /node_modules/
            },

            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&outputPath=images/',
            },
            {
                test: /\.(woff|eot|ttf|svg|gif)$/,
                loader: 'file-loader?name=iconfont/[path][name].[ext]',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: path.join(__dirname,'../','index.html'),
            title: 'hello world!',
            //chunks:['bundle']
        }),
        new HappyPack({ // 基础参数设置
            id: 'babel', // 上面loader?后面指定的id
            loaders: ['babel-loader?cacheDirectory'], // 实际匹配处理的loader
            threadPool: happyThreadPool,
            // cache: true // 已被弃用
            verbose: true
        }),
        extractCSS,
        extractLESS,
    ],
    externals:{
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    optimization: {
        splitChunks: {
            minSize: 1,
            chunks: "initial",
            name:"vendor"
        }
        /*splitChunks: {
            chunks: "initial",
            minSize: 1,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: "vendor",
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }*/
    }
}
