// Metadata + parsed content, eager (build-time)
const modules = import.meta.glob('./posts/*.md', { eager: true });
// Raw markdown strings, eager (build-time) — this is the key addition
const rawModules = import.meta.glob('./posts/*.md', { eager: true, query: '?raw', import: 'default' });

const slugFromPath = (path) => path.split('/').pop().replace('.md', '');

export const getAllPosts = () => {
  return Object.keys(modules).map((path) => ({
    slug: slugFromPath(path),
    ...modules[path].attributes,
  })).sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Now synchronous — no await, no client-only import
export const getPostContent = (slug) => {
  const entry = Object.keys(rawModules).find((p) => slugFromPath(p) === slug);
  if (!entry) return null;
  const raw = rawModules[entry];
  return raw.replace(/^---[\s\S]*?---\n/, ''); // strip frontmatter
};
