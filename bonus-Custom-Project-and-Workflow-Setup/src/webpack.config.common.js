var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app/main.ts',
    resolve: {
        extensions: [
            '.js',
            '.ts'
        ]
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loaders: ['html-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'sass-loader',
                ],
            }
        ],
        exprContextCritical: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
}