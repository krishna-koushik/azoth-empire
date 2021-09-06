import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { readFileSync } from 'fs';
import nodePolyfills from 'rollup-plugin-node-polyfills';

// https://stenciljs.com/docs/config

export const config: Config = {
    globalScript: 'src/global/app.ts',
    globalStyle: 'src/global/app.css',
    taskQueue: 'async',
    plugins: [
        sass({
            includePaths: ['./node_modules/'],
        }),
    ],
    namespace: 'azoth-empire',
    rollupPlugins: {
        after: [nodePolyfills()],
    },
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: 'loader',
        },
        {
            type: 'www',
            serviceWorker: null,
        },
    ],
    devServer: {
        reloadStrategy: 'pageReload',
        port: 3333,
        https: {
            cert: readFileSync('localhost.crt', 'utf8'),
            key: readFileSync('localhost.key', 'utf8'),
        },
    },
};
