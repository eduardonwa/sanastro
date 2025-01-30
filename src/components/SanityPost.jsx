import { useLiveQuery } from '@sanity/preview-kit';
import { createSanityClient } from '../../sanastro/sanityClient';

const client = createSanityClient();
const query = `*[_type == "post" && slug.current == $slug][0]`;

export default function SanityPost({ slug }) {
    const { data, loading } = useLiveQuery(query, { slug }, client);
    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!data) {
        return <div>No se encontraron datos.</div>;
    }

    return (
        <Layout>
            <h1>A post about {post.title}</h1>
            <PortableText portableText={post.body} />
        </Layout>
    );
}
