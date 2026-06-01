import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
    const siteUrl = site?.toString() ?? 'https://yourdomain.com';
    return new Response(
        [
            'User-agent: *',
            'Allow: /',
            '',
            `Sitemap: ${siteUrl}sitemap-index.xml`,
        ].join('\n'),
        { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
    );
};
