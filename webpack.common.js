const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} =require('clean-webpack-plugin')
module.exports = {
    entry:{
        index:'./src/index.js'
    },
    output: {
        filename: '[name]-bundle.js',
        publicPath:'./',
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        //配置loader
        rules:[
            //处理css
            {
                test: /\.css$/, //标识出需要进行转换文件类型,这里指的是所有以.css结尾的文件
                /*
                use: [  //转换时应该使用的loader
                    'style-loader',
                    'css-loader'
                ]*/
                use:[MiniCssExtractPlugin.loader, 'css-loader']
            },

            //处理图片
            {
                test:/\.(png|jpg|gif)$/i,
                use:[
                    {
                      loader: 'url-loader',
                      options: {
                          limit: 17313, //当图片大小超过limit值后,会生成一个文件,否则生成Data URL
                      }
                    }
                ]
            },
            //babel处理ES6
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: [["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]]
                    }
                }
            }           
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            //inject:'true',//script标签写在哪里，默认为body标签里
            hash:'true',//给生成的文件添加一个额外的唯一的hash标识
            chunks:['index']
        }),
        new MiniCssExtractPlugin({
            filename:'css/[name].[fullhash].css'
        }),
        new CleanWebpackPlugin()
    ]
};