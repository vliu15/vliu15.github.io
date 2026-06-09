import { ViteReactSSG } from 'vite-react-ssg'
import { routes, getRoutesToPrerender } from './routes'
import './index.css'

export const createRoot = ViteReactSSG({ routes })

// vite-react-ssg calls this to know which dynamic routes to generate
export function includedRoutes(paths, routes) {
  return getRoutesToPrerender()
}
