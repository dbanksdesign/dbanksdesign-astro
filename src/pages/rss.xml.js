import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getCollection, render } from 'astro:content';
import rss from '@astrojs/rss';

import reactRenderer from '@astrojs/react/server.js';
import mdxRenderer from '@astrojs/mdx/server.js';

export async function GET(context) {
	const container = await AstroContainer.create();
	container.addServerRenderer({ renderer: mdxRenderer });
	container.addServerRenderer({ renderer: reactRenderer });
	container.addClientRenderer({ name: '@astrojs/react', entrypoint: '@astrojs/react/client.js' });
	const posts = await getCollection('blog');

	const items = [];
	for (const post of posts) {
		if (post.data.draft) continue;
		const { Content } = await render(post);
		const content = await container.renderToString(Content);
		const link = new URL(`/posts/${post.slug}`, context.url.origin).toString();
		items.push({ ...post.data, link, content });
	}

	return rss({
		title: 'My blog',
		description: 'All my thoughts',
		site: context.site,
		items,
	});
}
