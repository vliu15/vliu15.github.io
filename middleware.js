// middleware.js

export const config = {
  matcher: '/((?!.*\\.).*)',
};

const customTitles = {
  'the-human-company': 'The Human Company',
  'the-robotics-data-pareto-frontier': 'The Robotics Data Pareto Frontier'
};

const customThumbnails = {
  'the-robotics-data-pareto-frontier': 'https://vliu15.github.io/robotics_data_pareto_frontier-top.png',
  // 1. Set the value to NULL to strictly disable the thumbnail for this slug
  'the-human-company': null, 
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const slug = url.pathname.replace(/^\//, '');

  const userAgent = req.headers.get('user-agent') || '';
  const isBot = /facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegram|applebot/i.test(userAgent);

  if (!isBot) return;

  // 2. Setup Defaults
  let finalTitle = 'Vincent Liu';
  let finalThumbnail = 'https://vliu15.github.io/profile.png';

  if (slug) {
    // --- Title Logic ---
    let postTitle = customTitles[slug];
    if (!postTitle) {
      postTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    }
    finalTitle = `Vincent Liu — ${postTitle}`;

    // --- Thumbnail Logic (Fixed) ---
    // Check if the slug exists in your map
    if (Object.prototype.hasOwnProperty.call(customThumbnails, slug)) {
      // If found, override the default (even if it is null)
      finalThumbnail = customThumbnails[slug];
    }
  }

  // 3. Fetch HTML
  const res = await fetch(`${url.origin}/index.html`);
  const html = await res.text();

  // 4. Create the Image Tag Conditionally
  // If finalThumbnail is null, we generate an empty string so no tag is rendered
  const imageMetaTag = finalThumbnail 
    ? `<meta property="og:image" content="${finalThumbnail}" />` 
    : '';

  // 5. Inject
  const newHtml = html
    .replace('<title>Vite App</title>', `<title>${finalTitle}</title>`)
    .replace('<title>Vincent Liu</title>', `<title>${finalTitle}</title>`)
    .replace('</head>', `
      <meta property="og:title" content="${finalTitle}" />
      <meta property="og:description" content="Read this post on my blog." />
      ${imageMetaTag} 
      <meta name="twitter:card" content="summary" />
    </head>`);

  return new Response(newHtml, {
    headers: { 'content-type': 'text/html; charset=UTF-8' },
  });
}
