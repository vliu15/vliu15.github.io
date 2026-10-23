import { ViteReactSSG } from 'vite-react-ssg'
import { routes, getRoutesToPrerender } from './routes'
import '@fontsource-variable/work-sans/wght.css'
import '@fontsource-variable/work-sans/wght-italic.css'
import '@fontsource/playfair-display/600.css'
import './index.css'

export const createRoot = ViteReactSSG({ routes })

// vite-react-ssg calls this to know which dynamic routes to generate
export function includedRoutes(paths, routes) {
  return getRoutesToPrerender()
}
