/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { createHtmlPlugin } from 'vite-plugin-html';

export default ({ mode }) => {
    const { VITE_TG_OAUTH_BOT_NAME } = loadEnv(mode, process.cwd());

    return defineConfig({
        plugins: [
            tsconfigPaths(),
            react(),
            mkcert(),
            createHtmlPlugin({
                entry: 'src/index.tsx',
                inject: {
                    data: {
                        injectScript: `<script async src="https://telegram.org/js/telegram-widget.js?21" data-telegram-login="${VITE_TG_OAUTH_BOT_NAME}" data-userpic="false" data-request-access="write" onload="setTimeout(document.getElementById('telegram-login-${VITE_TG_OAUTH_BOT_NAME}').style.display = 'none')"></script>`
                    },
                    tags: [
                        {
                            injectTo: 'body-prepend',
                            tag: 'div',
                            attrs: {
                                id: 'root'
                            }
                        }
                    ]
                }
            })
        ],
        server: {
            port: 5173,
            https: true,
            watch: {
                usePolling: true
            }
        },
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './tests/setup.ts',
            typecheck: {
                tsconfig: './tsconfig.test.json'
            }
        }
    });
};
