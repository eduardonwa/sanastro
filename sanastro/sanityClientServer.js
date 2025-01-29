import { createClient } from '@sanity/client'

export function createSanityClientServer() {
  return createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET,
    apiVersion: '2023-10-16',
    useCdn: false,
    token: import.meta.env.SANITY_API_READ_TOKEN,
  })
}