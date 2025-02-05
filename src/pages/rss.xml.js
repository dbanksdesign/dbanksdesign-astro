import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";
import { getCollection, render } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context) {
  const renderers = await loadRenderers([getMDXRenderer()]);
  const container = await AstroContainer.create({ renderers });
  const posts = await getCollection("blog");

  const items = [];
  for (const post of posts) {
    const { Content } = await render(post);
    const content = await container.renderToString(Content);
    const link = new URL(`/posts/${post.slug}`, context.url.origin).toString();
    items.push({ ...post.data, link, content });
  }

  return rss({
    title: "My blog",
    description: "All my thoughts",
    site: context.site,
    items,
  });
}
