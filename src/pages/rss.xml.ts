import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
    const postModules = Object.values(
        import.meta.glob('./blogs/*.mdx', { eager: true }),
    ) as any[];

    const posts = postModules
        .filter((p) => p.frontmatter.published === true)
        .sort(
            (a, b) =>
                new Date(b.frontmatter.pubDate).valueOf() -
                new Date(a.frontmatter.pubDate).valueOf(),
        );

    return rss({
        title: 'Om Lachake — Blog',
        description: 'Insights, updates, and engineering logs.',
        site: context.site!,
        items: posts.map((post) => ({
            title: post.frontmatter.title,
            pubDate: new Date(post.frontmatter.pubDate),
            description: post.frontmatter.description,
            link: post.url,
        })),
        customData: '<language>en-us</language>',
    });
}
