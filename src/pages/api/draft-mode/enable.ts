import type { APIRoute } from 'astro';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { createClient } from '@sanity/client';

export const GET: APIRoute = async ({ request }) => {
  const client = createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET,
    token: import.meta.env.SANITY_API_READ_TOKEN,
    apiVersion: '2023-10-16',
    perspective: 'previewDrafts',
    useCdn: false,
  });

  const { isValid, redirectTo = '/' } = await validatePreviewUrl(client, request.url);

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 });
  }

  return new Response(null, {
    status: 307,
    headers: {
      Location: redirectTo,
      'Set-Cookie': 'draftMode=true; Path=/; HttpOnly; SameSite=Strict',
    },
  });
};