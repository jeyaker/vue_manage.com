const path = require('path');

module.exports = {
    devServer: {
        open: true,
        // proxy: {
        //     '/shop': {
        //         target: 'http://localhost:3000',
        //         changeOrigin: true
        //     }
        // }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', path.join(__dirname, 'src'))
            .set('views', path.join(__dirname, 'src/views'))
            .set('layout', path.join(__dirname, 'src/layout'))
            .set('assets', path.join(__dirname, 'src/assets'))
            .set('store', path.join(__dirname, 'src/store'))
            .set('components', path.join(__dirname, 'src/components'))
            .set('router', path.join(__dirname, 'src/router'))
            .set('filters', path.join(__dirname, 'src/filters'))
            .set('utils', path.join(__dirname, 'src/utils'))
    }
}