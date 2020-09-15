// const path = require('path');
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
// const webpack = require('webpack');



// module.exports = function override(config, env) {
//     // do stuff with the webpack config...
//     return config;
// };


// function configureSassLoaderAndSassModule(isDevelopment) {
//     function _(config) {
        // const p = path.resolve(__dirname, 'src/vendor/file1.ts');
        // console.log(p)
        // config.entry.push(p)

        // config.optimization.splitChunks.cacheGroups = {
        //     vendor: {
        //         test: /[\\/]src[\\/]vendor[\\/](file1)/,
        //         name: 'vendors',
        //         chunks: 'all'
        //     }
        // }
        //     new webpack.optimize.SplitChunksPlugin({
        //         name: 'commons',
        //         // (the commons chunk name)
              
        //         filename: path.resolve(__dirname, 'src/vendor/file1.ts'),
        //         // (the filename of the commons chunk)
              
        //         // minChunks: 3,
        //         // (Modules must be shared between 3 entries)
              
        //         // chunks: ["pageA", "pageB"],
        //         // (Only use these entries)
        //       })
        // )
        // console.log(config)
//         return config
//     }
//     return _;
// }

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    // addWebpackPlugin(new TsconfigPathsPlugin({ configFile: './tsconfig.json' })),
    // addBabelPlugins(
    //     "dynamic-import-node",
    //     "@babel/plugin-transform-runtime"
    // ),
    addLessLoader({
        // strictMath: false,
        // noIeCompat: true,
        // localIdentName: "[local]--[hash:base64:5]",
        javascriptEnabled: true,
        modifyVars: { 
            '@primary-color': '#1DA57A'
        },
    }),
    // configureSassLoaderAndSassModule(true)
);