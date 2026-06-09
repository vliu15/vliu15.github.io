import { Layout, Home } from './App';
import Post from './Post';
import { getAllPosts } from './loader';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: ':slug', element: <Post /> },
    ],
  },
];

// Tells the SSG which dynamic paths to prerender
export function getRoutesToPrerender() {
  const posts = getAllPosts().filter((p) => !p.unreleased);
  return ['/', ...posts.map((p) => `/${p.slug}`)];
}
