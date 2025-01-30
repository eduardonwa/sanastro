import { PortableText } from '@portabletext/react';
import { useLiveQuery } from '@sanity/preview-kit';
import client from '../../sanastro/sanityClient';

const query = `*[_type == "post" && slug.current == $slug][0]`;

export default function SanityPost({ slug }) {
  const { data, loading, error } = useLiveQuery(query, { slug }, client);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No se encontraron datos.</div>;
  }

  return (
    <Layout>
        <h1>A post about {data.title}</h1>
        <PortableText blocks={data.body} />
    </Layout>
  );
}