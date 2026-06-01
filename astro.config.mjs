// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tunnel from 'astro-tunnel';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    site: process.env.PUBLIC_SITE_URL || 'https://yourdomain.com',
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
        mdx(),
        react(),
        sitemap(),
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
