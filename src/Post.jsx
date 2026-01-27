import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { getPostContent, getAllPosts } from './loader'; 

const Post = () => {
  const { slug } = useParams();
  const [postContent, setPostContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const meta = getAllPosts().find(p => p.slug === slug);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        const data = await getPostContent(slug);
        const cleanContent = data.content.replace(/^---[\s\S]*?---\n/, '');
        setPostContent(cleanContent);
      } catch (error) {
        console.error("Failed to load post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) loadPost();
  }, [slug]);

  if (loading) return <div className="py-20 text-center text-stone-500">Loading...</div>;
  if (!meta || meta.unreleased) return <div className="py-20 text-center">Post not found.</div>;

  const authors = meta.author ? meta.author.split(',').map(s => s.trim()) : ["Vincent Liu"];

  return (
    <article className="animate-in fade-in duration-700">
      <header className="mb-12 border-b border-stone-100 pb-8">
        {/* Added 'lowercase' to the className below */}
        <h1 className="text-2xl font-serif font-semibold leading-tight tracking-wide mb-4 lowercase">
          {meta.title}
        </h1>
        <div className="flex-wrap items-center gap-x-4 gap-y-2 text-stone-400">
          <div className="items-center gap-2 mb-2">
            <div className="gap-2">
              {authors.map((name, index) => (
                <span key={name} className="!text-stone-600 !text-xs">
                  {name}{index < authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>
          <span className="metadata-text !text-stone-600 !text-xs">{meta.date}</span>
        </div>
      </header>
      <div className="prose font-serif">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            img: ({node, ...props}) => (
              <img {...props} style={{ maxWidth: '100%', height: 'auto' }} />
            ),
            h2: ({node, ...props}) => {
              if (props.id === 'footnote-label') return <h2 {...props}>Footnotes.</h2>;
              return <h2 {...props} />;
            }
          }}
        >
          {postContent}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default Post;
