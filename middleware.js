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

const customDescriptions = {
  'the-robotics-data-pareto-frontier': 'The defining narrative of robotics in 2025 was not a new model architecture, but an enthusiasm for data. Despite a consensus around teleoperation as the gold standard, interest blossomed in the data and training recipes that transcend it. This appetite defined a new market category and spurred the creation of innumerable data collection startups aiming to address the heterogeneous robotics data problem. At the intersection of data companies and robotics research lies a recurring theme: human data. In just the last month, the industry’s largest players—whose initial hypotheses were staked on either hardware, teleoperation, or simulation—have all announced breakthroughs in learning from human data.',
  'the-human-company': 'We exist at a precipice in human history. The last decade has seen the birth of a new class of intelligence that rivals our own cognitive capabilities as humans. One of the greatest promises of artificial general intelligence is its potential to reason about and automate tasks in the physical world, and this future of general-purpose robotics is now within reach. Our mission is to accelerate this path to abundance.',
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const slug = url.pathname.replace(/^\//, '');

  const userAgent = req.headers.get('user-agent') || '';
  const isBot = /facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegram|applebot/i.test(userAgent);

  if (!isBot) return;

  // Defaults
  let postTitle = 'Vincent Liu';
  let finalTitle = 'Vincent Liu';
  let finalThumbnail = 'https://vliu15.github.io/logo.png'; // Ensure this default image exists!
  let finalDescription = 'Vincent Liu\'s Personal Website.';

  if (slug) {
    // --- Title Logic ---
    postTitle = customTitles[slug];
    if (!postTitle) {
      postTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    }
    finalTitle = `${postTitle} ― Vincent Liu`;

    // --- Thumbnail Logic ---
    if (Object.prototype.hasOwnProperty.call(customThumbnails, slug)) {
      finalThumbnail = customThumbnails[slug];
    }

    // --- New Description Logic ---
    if (customDescriptions[slug]) {
      const rawDesc = customDescriptions[slug];
      finalDescription = rawDesc.length > 160 
            ? rawDesc.slice(0, 157) + '...' 
            : rawDesc;
    }
  }

  const res = await fetch(`${url.origin}/index.html`);
  const html = await res.text();

  let newHtml = html
    .replace(/<title>.*?<\/title>/g, '') 
    .replace(/<meta property="og:title".*?>/g, '')
    .replace(/<meta property="og:description".*?>/g, '')
    .replace(/<meta property="og:image".*?>/g, '')
    .replace(/<meta name="twitter:card".*?>/g, '');

  const imageMetaTag = finalThumbnail 
    ? `<meta property="og:image" content="${finalThumbnail}" />` 
    : '';

  // 4. INJECT THE VARIABLE (${finalDescription}) instead of static text
  newHtml = newHtml.replace('<head>', `
    <head>
      <title>${finalTitle}</title>
      <meta property="og:title" content="${postTitle}" />
      <meta property="og:description" content="${finalDescription}" />
      ${imageMetaTag}
      <meta name="twitter:card" content="summary_large_image" />
  `);

  return new Response(newHtml, {
    headers: { 'content-type': 'text/html; charset=UTF-8' },
  });
}
