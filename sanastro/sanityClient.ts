import { createClient } from '@sanity/client';

export function createSanityClient() {
  return createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID, // ¡Obligatorio!
    dataset: import.meta.env.PUBLIC_SANITY_DATASET, // ¡Obligatorio!
    token: import.meta.env.SANITY_API_READ_TOKEN, // Necesario para previewDrafts (opcional, pero recomendable)
    apiVersion: '2023-10-16', // O la versión que uses
    useCdn: false, // ¡Importante! Debe ser false para previewDrafts
    perspective: import.meta.env.MODE === 'development' ? 'previewDrafts' : 'published',
  });
}

export async function sanityFetch(query: any, params = {}) {
  const client = createSanityClient(); // Crea el cliente (con la perspectiva correcta)
  try {
    const data = await client.fetch(query, params);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // O maneja el error como prefieras
  }
}

export { createClient };
