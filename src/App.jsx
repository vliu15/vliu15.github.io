import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { getAllPosts } from './loader';

const Post = lazy(() => import('./Post'));

const RedirectHandler = () => {
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get('p');
    if (redirectPath) window.history.replaceState(null, '', redirectPath);
  }, [location]);
  return null;
};

const ExternalLink = ({ href, children, className = "" }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`link-external ${className}`}>
    {children}
  </a>
);

const Layout = ({ children }) => (
  <div className="app-container">
    <nav className="mb-16">
      <Link to="/" className="nav-brand" title="home" aria-label="home">«</Link>
    </nav>
    <main>{children}</main>
    <footer className="footer-section">
      <div className="flex gap-4 mb-4">
        {/* Your social links remain unchanged */}
        <ExternalLink href="https://twitter.com/vincentjliu" className="decoration-transparent">
          <svg className="social-svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </ExternalLink>
        <ExternalLink href="https://scholar.google.com/citations?user=TY0sFqgAAAAJ" className="decoration-transparent">
          <svg className="social-svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 24a7 7 0 0 1-7-7c0-2.58 1.41-4.93 3.61-6.16L5.05 7.11 12 1 18.95 7.11l-3.56 3.73C17.59 12.07 19 14.42 19 17a7 7 0 0 1-7 7zm0-12a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
          </svg>
        </ExternalLink>
        <ExternalLink href="mailto:vincent.liu15@gmail.com" className="decoration-transparent">
          <svg className="social-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </ExternalLink>
      </div>
      <div className="copyright-text">© {new Date().getFullYear()} Vincent Liu</div>
    </footer>
  </div>
);

const Home = () => {
  // 3. This continues to work perfectly because your new loader.js
  // eagerly loads the metadata (title, date, description) for this page.
  const posts = getAllPosts().sort((a, b) => (b.order || 0) - (a.order || 0));
  
  return (
    <div className="space-y-20">
      <header className="items-center">
        <img src="/profile.png" alt="Profile" className="profile-image" />
        <div>
          <h1 className="text-xl font-semibold font-serif tracking-wide mb-4">Vincent Liu</h1>
          <p className="text-sm mb-4">I'm a cofounder at <ExternalLink href="https://mecha.company">Mecha</ExternalLink>, a robotics startup focused on scaling robot learning from real-world human data. I'm interested in creating the systems that support AI. In a past life, I trained as <ExternalLink href="https://youtu.be/nvZtGpNVB0Y?si=2LtaTx5bsVWjvHlR">a concert pianist</ExternalLink>.</p>
          <p className="text-sm mb-4">I studied Mathematics at Stanford. As an undergraduate, I was on <ExternalLink href="https://www.tesla.com/fsd">Andrej Karpathy's AI Team</ExternalLink> at Tesla and helped create <ExternalLink href="https://cs236g.stanford.edu">Stanford's PhD-level GANs class</ExternalLink>. I was later a founding researcher at <ExternalLink href="https://www.theinformation.com/briefings/exclusive-google-acquires-3d-image-generator-startup">CSM, acquired by Google DeepMind</ExternalLink>. My AI research has spanned robotics, 3D, speech, NLP, computer vision, reinforcement learning, and self-supervised learning.</p>
        </div>
      </header>
      <section>
        <div className="space-y-12">
          {posts.map((post) => (
            <div key={post.slug} className="flex flex-col">
              {post.unreleased ? (
                <h3 className="text-xl font-serif font-medium mb-2 text-stone-400">
                  {post.title}
                </h3>
              ) : (
                <Link to={`/${post.slug}`} className="w-fit group no-underline">
                  <h3 className="post-entry-title">{post.title}</h3>
                </Link>
              )}
              <p className="text-sm !text-stone-500 italic mb-1 leading-relaxed">{post.description}</p>
              <span className="metadata-text">
                {post.unreleased ? `${post.date} (unreleased)` : post.date}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <RedirectHandler />
      <Layout>
        {/* 4. Suspense ensures the app doesn't crash while fetching 'Post.jsx' */}
        <Suspense fallback={<div className="py-20 text-center text-stone-500">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:slug" element={<Post />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
