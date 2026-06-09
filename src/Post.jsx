import { useParams } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { getPostContent, getAllPosts } from './loader';

const Post = () => {
  const { slug } = useParams();
  const meta = getAllPosts().find((p) => p.slug === slug);
  const postContent = getPostContent(slug);

  if (!meta || meta.unreleased || !postContent) {
    return <div className="py-20 text-center">Post not found.</div>;
  }

  const authors = meta.author ? meta.author.split(',').map((s) => s.trim()) : ['Vincent Liu'];
  const description = (meta.description || '').slice(0, 160);
  const pageTitle = `${meta.title} ― Vincent Liu`;

  return (
    <article className="animate-in fade-in duration-700">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        {meta.thumbnail && <meta property="og:image" content={meta.thumbnail} />}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className="mb-12 border-b border-stone-100 pb-8">
        <h1 className="text-2xl font-serif font-semibold leading-tight tracking-wide mb-4 lowercase">
          {meta.title}
        </h1>
        <div className="flex-wrap items-center gap-x-4 gap-y-2 text-stone-400">
          <div className="items-center gap-2 mb-2">
            <div className="gap-2">
              {authors.map((name, index) => (
                <span key={name} className="!text-stone-600 !text-xs">
                  {name}{index < authors.length - 1 ? ', ' : ''}
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
            img: ({ node, ...props }) => (
              <img {...props} style={{ maxWidth: '100%', height: 'auto' }} />
            ),
            h2: ({ node, ...props }) => {
              if (props.id === 'footnote-label') return <h2 {...props}>Footnotes.</h2>;
              return <h2 {...props} />;
            },
          }}
        >
          {postContent}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default Post;
