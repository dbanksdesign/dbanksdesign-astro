// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: 'https://dbanks.design',
	markdown: {
		syntaxHighlight: 'prism',
	},
	vite: {
		ssr: {
			noExternal: ['@astrojs/prism'],
		},
	},
	integrations: [mdx(), sitemap(), react()],
});
