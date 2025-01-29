import { createClient, type QueryParams } from '@sanity/client'; // Importa desde @sanity/client

export async function loadQuery<T>({
  query,
  params,
  client,
}: {
  query: string;
  params?: QueryParams;
  client: ReturnType<typeof createClient>; // Tipa client correctamente
}): Promise<{ data: T }> {
  const data = await client.fetch<T>(query, params ?? {});

  return { data };
}