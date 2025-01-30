// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from "vite";

import react from '@astrojs/react';
import sanity from '@sanity/astro';
import netlify from '@astrojs/netlify';

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      apiVersion: '2023-10-16',
      studioBasePath: '/studio',
      useCdn: false,
      stega: {
        studioUrl: "/studio",
      },
    }),
    react()
  ],
  output: 'server',
  adapter: netlify()
});