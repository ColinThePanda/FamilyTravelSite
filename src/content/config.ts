import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const places = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: `./src/content/places` }),
	schema: z.object({
		title: z.string(),
	}),
});

export const collections = { places };
