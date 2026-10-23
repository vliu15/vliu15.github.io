import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { getPostContent, getAllPosts } from './loader';

const TITLE_ID = 'post-title';

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const stripMarkdown = (s) => s.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '').trim();
const textOf = (c) => (typeof c === 'string' ? c : Array.isArray(c) ? c.map(textOf).join('') : textOf(c?.props?.children ?? ''));

const getSections = (markdown) =>
  [...(markdown || '').matchAll(/^### +(.+)$/gm)].map(([, t]) => ({ id: slugify(stripMarkdown(t)), label: stripMarkdown(t) }));

// The last section whose heading has scrolled above 40% of the viewport is active.
const useActiveSection = (sections) => {
  const [active, setActive] = useState(TITLE_ID);
  useEffect(() => {
    const update = () => {
      let current = TITLE_ID;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [sections]);
  return active;
};

// Defined once so ReactMarkdown doesn't remount images and headings on every render.
const remarkPlugins = [remarkGfm];
const rehypePlugins = [rehypeRaw];
const markdownComponents = {
  img: ({ node, ...props }) => (
    <img {...props} style={{ maxWidth: '100%', height: 'auto' }} />
  ),
  h2: ({ node, ...props }) => {
    if (props.id === 'footnote-label') return <h2 {...props}>Footnotes</h2>;
    return <h2 {...props} />;
  },
  h3: ({ node, children, ...props }) => (
    <h3 {...props} id={slugify(stripMarkdown(textOf(children)))} className="scroll-mt-16">
      {children}
    </h3>
  ),
};

// Sticky section list to the left of the article on wide screens, with an accent bar that slides to the active item.
// It tracks the active section itself so scrolling re-renders only this list, not the whole article.
const TableOfContents = ({ title, sections }) => {
  const active = useActiveSection(sections);
  const items = useMemo(
    () => [
      { id: TITLE_ID, label: title, onSelect: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
      ...sections.map((s) => ({ ...s, onSelect: () => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }) })),
    ],
    [title, sections],
  );
  const listRef = useRef(null);
  const [bar, setBar] = useState(null);
  const activeIndex = items.findIndex((item) => item.id === active);

  useEffect(() => {
    const measure = () => {
      const el = listRef.current?.children[activeIndex];
      setBar(el ? { top: el.offsetTop - 6, height: el.offsetHeight + 12 } : null);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeIndex, items.length]);

  return (
    <nav aria-label="Sections" className="hidden xl:block absolute right-full inset-y-0 mr-12 w-44">
      <div className="sticky top-1/2 -translate-y-1/2">
        <div className="relative">
          <ol ref={listRef} className="space-y-3 pr-3">
            {items.map((item) => (
              <li key={item.id} className="relative">
                <button
                  onClick={item.onSelect}
                  className={`text-xs text-left leading-snug cursor-pointer transition-colors duration-500 ${
                    item.id === active ? '!text-theme-dark' : '!text-stone-500 hover:!text-theme-dark'
                  }`}
                >
                  {item.label}
                </button>
                <span className="absolute -right-3 -inset-y-1.5 w-px !bg-stone-200" />
              </li>
            ))}
          </ol>
          {bar && (
            <span
              className="absolute right-0 w-px !bg-theme-dark transition-[top,height] duration-500 ease-in-out"
              style={{ top: bar.top, height: bar.height }}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

const Post = () => {
  const { slug } = useParams();
  const meta = getAllPosts().find((p) => p.slug === slug);
  const postContent = getPostContent(slug);
  const sections = useMemo(() => getSections(postContent), [postContent]);

  if (!meta || meta.unreleased || !postContent) {
    return <div className="py-20 text-center">Post not found.</div>;
  }

  const authors = meta.author ? meta.author.split(',').map((s) => s.trim()) : ['Vincent Liu'];
  const description = (meta.description || '').slice(0, 160);
  const pageTitle = `${meta.title} ― Vincent Liu`;

  return (
    <article className="relative animate-in fade-in duration-700">
      {sections.length > 0 && <TableOfContents title={meta.title} sections={sections} />}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        {meta.thumbnail && <meta property="og:image" content={meta.thumbnail} />}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className="mb-12">
        <h1 id={TITLE_ID} className="text-2xl font-serif font-semibold leading-tight mb-3">
          {meta.title}
        </h1>
        <p className="text-xs !text-stone-500 leading-normal">
          {meta.date} · {authors.join(', ')}
        </p>
      </header>

      <div className="prose">
        <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins} components={markdownComponents}>
          {postContent}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default Post;
