import matter from 'gray-matter';

// Use eager: true to ensure files are loaded at build time
const postFiles = import.meta.glob('./posts/*.md', { query: '?raw', eager: true });

export const getAllPosts = () => {
  return Object.keys(postFiles).map((filePath) => {
    const fileName = filePath.split('/').pop().replace('.md', '');
    const rawContent = postFiles[filePath].default;
    const { data, content } = matter(rawContent);

    return {
      slug: fileName,
      ...data,
      content,
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
};
