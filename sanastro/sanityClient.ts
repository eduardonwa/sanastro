import { createClient } from '@sanity/client';

export function createSanityClient(preview = false) {
  return createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET,
    token: import.meta.env.SANITY_API_READ_TOKEN,
    apiVersion: '2023-10-16',
    useCdn: false,
    perspective: preview ? 'previewDrafts' : 'published',
  });
}

export async function sanityFetch(query: any, params = {}) {
  const client = createSanityClient();
  try {
    const data = await client.fetch(query, params);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export { createClient };
