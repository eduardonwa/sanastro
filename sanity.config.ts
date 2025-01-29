/** AQUI SE INSTALAN PLUGINS, SCHEMAS, PERSONALIZACIONES, ETC*/
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schema} from "./sanastro/schemaTypes";
import { presentationTool } from "sanity/presentation";
import { resolve } from "./sanastro/lib/resolve";
import {visionTool} from '@sanity/vision'

export default defineConfig({
  name: 'san-astro',
  title: 'San Astro',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable'
        }
      },
      title: 'Presentación',
    }),
  ],
  schema,
})