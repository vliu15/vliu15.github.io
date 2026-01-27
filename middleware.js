// middleware.js

export const config = {
  matcher: '/((?!.*\\.).*)',
};

// Optional: Add specific titles here for perfect capitalization
const customTitles = {
  'the-human-company': 'The Human Company',
  'the-robotics-data-pareto-frontier': 'The Robotics Data Pareto Frontier'
};

const customThumbnails = {
  'the-robotics-data-pareto-frontier': 'https://vliu15.github.io/robotics_data_pareto_frontier-top.png',
}

export default async function middleware(req) {
  const url = new URL(req.url);
  const slug = url.pathname.replace(/^\//, ''); // Remove leading slash

  // 1. Detect Bots
  const userAgent = req.headers.get('user-agent') || '';
  const isBot = /facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegram|applebot/i.test(userAgent);

  if (!isBot) return;

  // 2. Determine the Title
  let finalTitle = 'Vincent Liu';  // Default for Homepage
  let finalThumbnail = 'https://vliu15.github.io/profile.png'

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

    let postThumbnail = customThumbnails[slug];
    if (!postThumbnail) {
      finalThumbnail = postThumbnail;
    }
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
      <meta property="og:image" content="${finalThumbnail}" />
      <meta name="twitter:card" content="summary" />
    </head>`);

  return new Response(newHtml, {
    headers: { 'content-type': 'text/html; charset=UTF-8' },
  });
}