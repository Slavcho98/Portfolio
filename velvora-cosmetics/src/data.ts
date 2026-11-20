export const img = (id: string, w = 800, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=70&w=${w}${h ? `&h=${h}` : ''}`

// Product data now lives in MongoDB (see /server and /data/products.json). Only editorial content stays here.

export const categories = [
  { slug: 'skincare', name: 'Skincare', tagline: 'Glow routines', image: img('1598440947619-2c35fc9aa908', 800, 1000) },
  { slug: 'lips', name: 'Lips', tagline: 'Colour & care', image: img('1773372238316-5f080152bcf1', 800, 1000) },
  { slug: 'hair', name: 'Hair', tagline: 'Healthy shine', image: img('1786737554096-4b22c03ad991', 800, 1000) },
  { slug: 'eye', name: 'Eye', tagline: 'Lashes & liners', image: img('1515688594390-b649af70d282', 800, 1000) },
  { slug: 'makeup', name: 'Makeup', tagline: 'Everyday looks', image: img('1512496015851-a90fb38ba796', 800, 1000) },
  { slug: 'fragrance', name: 'Fragrance', tagline: 'Signature scents', image: img('1523293182086-7651a899d37f', 800, 1000) },
] as const

export const collections = [
  { title: 'My Roses', kicker: 'New collection', href: '#/shop?collection=my-roses', image: img('1531874824027-2a0d33bd6338', 1100) },
  { title: 'Hair Health', kicker: 'Shop hair care', href: '#/shop?category=hair', image: img('1522337360788-8b13dee7a37e', 900) },
  { title: 'Bodyshowers', kicker: 'On sale now', href: '#/shop?collection=sale', image: img('1786359410255-f0144e1a38e0', 900) },
]

export const images = {
  heroLeft: img('1583209814683-c023dd293cc6', 1400, 1000),
  heroRight: img('1773372238338-f26460145162', 1400, 1000),
  video: img('1787569499510-ef18cc7ba7a5', 2000, 1000),
  discount: img('1617055407123-3d7130c1f940', 1600, 1200),
  discountSide: img('1580870069867-74c57ee1bb07', 1000, 1300),
}
