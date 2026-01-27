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
  'the-human-company': null, 
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const slug = url.pathname.replace(/^\//, '');

  const userAgent = req.headers.get('user-agent') || '';
  const isBot = /facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegram|applebot/i.test(userAgent);

  if (!isBot) return;

  // Defaults
  let finalTitle = 'Vincent Liu';
  let finalThumbnail = 'https://vliu15.github.io/logo.png'; // Ensure this default image exists!

  if (slug) {
    // --- Title Logic ---
    let postTitle = customTitles[slug];
    if (!postTitle) {
      postTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    }
    finalTitle = `\u200BVincent Liu — ${postTitle}`;

    // --- Thumbnail Logic ---
    if (Object.prototype.hasOwnProperty.call(customThumbnails, slug)) {
      finalThumbnail = customThumbnails[slug];
    }
  }

  const res = await fetch(`${url.origin}/index.html`);
  const html = await res.text();

  // --- The Fix: Remove OLD tags first to avoid duplicates ---
  // We use regex to wipe out any existing og:title, og:image, etc. from the template
  let newHtml = html
    .replace(/<title>.*?<\/title>/g, '') 
    .replace(/<meta property="og:title".*?>/g, '')
    .replace(/<meta property="og:description".*?>/g, '')
    .replace(/<meta property="og:image".*?>/g, '')
    .replace(/<meta name="twitter:card".*?>/g, '');

  // --- Create conditional Image Tag ---
  const imageMetaTag = finalThumbnail 
    ? `<meta property="og:image" content="${finalThumbnail}" />` 
    : '';

  // --- Inject NEW tags cleanly at the top of head ---
  newHtml = newHtml.replace('<head>', `
    <head>
      <title>${finalTitle}</title>
      <meta property="og:title" content="${finalTitle}" />
      <meta property="og:description" content="Read this post on my blog." />
      ${imageMetaTag}
      <meta name="twitter:card" content="summary_large_image" />
  `);

  return new Response(newHtml, {
    headers: { 'content-type': 'text/html; charset=UTF-8' },
  });
}
