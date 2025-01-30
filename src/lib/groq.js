export const getPostQuery = `
    *[_type == "post" && slug.current == $slug][0]
    `;