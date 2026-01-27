// middleware.js

export const config = {
  matcher: '/((?!.*\\.).*)',
};

// Optional: Add specific titles here for perfect capitalization
const customTitles = {
  'future-of-ai': 'The Future of AI',
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const slug = url.pathname.replace(/^\//, ''); // Remove leading slash

  // 1. Detect Bots
  const userAgent = req.headers.get('user-agent') || '';
  const isBot = /facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegram|applebot/i.test(userAgent);

  if (!isBot) return;

  // 2. Determine the Title
  let finalTitle = 'Vincent Liu'; // Default for Homepage

  // If there IS a slug, it's a blog post -> Use the dynamic format
  if (slug) {
    let postTitle = customTitles[slug];
    
    // Fallback: Generate title from URL if not in customTitles
    if (!postTitle) {
      postTitle = slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }
    
    finalTitle = `Vincent Liu — ${postTitle}`;
  }

  // 3. Fetch the HTML template
  const res = await fetch(`${url.origin}/index.html`);
  const html = await res.text();

  // 4. Inject the Title and Meta Tags
  // We try to replace both "Vite App" (default) and "Vincent Liu" (if you edited index.html)
  // to ensure the replacement always works.
  const newHtml = html
    .replace('<title>Vite App</title>', `<title>${finalTitle}</title>`)
    .replace('<title>Vincent Liu</title>', `<title>${finalTitle}</title>`)
    .replace('</head>', `
      <meta property="og:title" content="${finalTitle}" />
      <meta property="og:description" content="Read this post on my blog." />
      <meta property="og:image" content="https://vliu15.github.io/profile.png" />
      <meta name="twitter:card" content="summary" />
    </head>`);

  return new Response(newHtml, {
    headers: { 'content-type': 'text/html; charset=UTF-8' },
  });
}