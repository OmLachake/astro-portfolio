// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import tunnel from 'astro-tunnel';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
        server: {
            allowedHosts: ['injurable-rosalyn-answerlessly.ngrok-free.dev'],
        },
    },
    devToolbar: {
        enabled: true,
    },
    integrations: [
        react(),
        tunnel(),
        icon({
            iconDir: 'src/icons',
            include: {
                mdi: ['*'],
                'line-md': ['*'],
            },
        }),
    ],
});
