import type { APIRoute } from 'astro';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { createSanityClientServer } from '../../../../sanastro/sanityClientServer';

export const GET: APIRoute = async ({ request }) => {
  const client = createSanityClientServer();

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