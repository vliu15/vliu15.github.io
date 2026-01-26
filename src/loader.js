// Use eager: true to ensure files are loaded at build time
const modules = import.meta.glob('./posts/*.md', { eager: true });

export const getAllPosts = () => {
  return Object.keys(modules).map((path) => {
    const slug = path.split('/').pop().replace('.md', '');
    const post = modules[path];
    return {
      slug,
      ...post.attributes,
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
};

// The '?raw' query makes this a "different" module to Rollup, 
// so it gets its own chunk!
export const getPostContent = async (slug) => {
  const module = await import(`./posts/${slug}.md?raw`);
  return {
    // We don't need attributes here (we already have them from the route/params if needed),
    // but we can pass the raw string to be cleaned up.
    content: module.default // ?raw imports export the string as 'default'
  };
};

