const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        __dirname + '/public/js/jquery.min.js',
        __dirname + '/public/js/bootstrap.min.js',
        __dirname + '/public/js/main.js'
    ],

    output: {
        path: path.resolve(__dirname, 'public/build'),
        publicPath: 'build/',
        filename: 'build.js'
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}
