import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

// https://stenciljs.com/docs/config

export const config: Config = {
    globalScript: 'src/global/app.ts',
    globalStyle: 'src/global/app.css',
    taskQueue: 'async',
    plugins: [sass({})],
    namespace: 'azoth-empire',
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
    },
};
