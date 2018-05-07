import path from 'path';
import merge from 'webpack-merge';
import {default as common} from './webpack.common.config.babel';
const devObj = {
    output: {
        path: path.resolve(__dirname, 'src')
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './src',
        port: 9001,
        compress:true
    }
};
export default merge(common, devObj);