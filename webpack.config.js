/* -*- coding: utf-8 -*-

 Copyright 2021, 2021 dpa-IT Services GmbH

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/dnl_embeds.js',
        clean: true
    },
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: './node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
                to: 'js/webcomponents/webcomponents-loader.js'
            }, {
                from: './node_modules/@webcomponents/webcomponentsjs/bundles',
                to: 'js/webcomponents/bundles'
            }]
        })
    ]
}