// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import remarkFlexibleMarkers from "remark-flexible-markers";

const isGitHub = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
	markdown: {
		remarkPlugins: [remarkFlexibleMarkers],
	},
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": "/src",
			},
		},
	},
	integrations: [
		react(),
		mdx({
			remarkPlugins: [remarkFlexibleMarkers],
		}),
	],
	output: "static",
	site: "https://colinthepanda.github.io",
	base: isGitHub ? "/FamilyTravelSite/" : "/",
});
