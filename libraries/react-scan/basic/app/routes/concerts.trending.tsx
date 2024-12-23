import type { Route } from './+types/concerts.trending'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Trending Concerts' }, { name: 'description', content: 'Trending Concerts' }]
}

export default function TrendingConcerts() {
  return <div>Trending Concerts</div>
}
