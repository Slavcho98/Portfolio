# Velvora – Natural Cosmetics Storefront

A modern cosmetics storefront inspired by the "Wide Home" layout of the Luchiana theme, built with React 19, TypeScript and Vite. Branding, copy and photography are original/placeholder.

## Features

- Floating glass header, announcement bar, responsive mobile menu
- Split hero, expanding category cards, tabbed **Top Products** grid, video banner, sale countdown + slider, bento collections
- **Shop page** (`#/shop`): every product from MongoDB with a sticky filter sidebar (category with nested subcategories, skin/hair concern, finish, undertone, price range slider, collections, brand, minimum rating, in-stock / vegan switches) with live counts, removable active-filter chips, search and sorting. Results load 24 at a time with a "Load more" button and a progress bar. On phones the same filters open in a slide-in drawer. All filters live in the URL, so any filtered view can be bookmarked or shared (for example `#/shop?category=skincare&sub=Serum&max=60`). Products without a photo yet show a category-tinted placeholder
- **Product page** (`#/product/<slug>`): image gallery with hover zoom, shade swatches or pack options (variants can have their own price), live stock status, quantity, add to bag / wishlist, and accordions for description, how to use, key ingredients, scent profile (fragrances), product details and shipping. Plus rating breakdown, related products, breadcrumb, page title / meta description and Product structured data
- **Bag / cart**: quick-add (+) on every card with a shade picker for variants (variants can have their own price), a toast with "View bag", and a **slide-in bag drawer** (opened from the header bag button) with quantity steppers, remove, free-shipping meter and subtotal. The full `#/cart` page (promo codes `VELVORA10` / `WELCOME15`, order note, "pairs well with") is reached via "View full bag"
- **Wishlist drawer**: heart any product, review saved items in a side panel, add them (or a chosen shade) to the bag, or "Add all to bag"
- Cart and wishlist persist across reloads
- On phones, removing an item (trash, stepping a quantity to 0, or "Clear bag") opens a confirmation bottom sheet with an elastic "warp" edge while the page behind recedes; on larger screens items are removed immediately
- Animations powered by [Motion](https://motion.dev) (`motion/react`): staggered hero and grid entrances, scroll-reveal, video parallax, scroll progress bar, shared-layout tab pill, spring drawers with swipe-to-dismiss, animated counters and list add/remove. Respects `prefers-reduced-motion`

## Getting started

The storefront reads its products from MongoDB through the Express API in [`server/`](server/README.md), so seed the database once and then run both processes:

```bash
npm install
cd server && npm install && npm run seed && cd ..   # needs MongoDB running (local or Atlas, see server/README.md)
npm run dev:all                                      # Vite on :5173 + API on :4000
```

`npm run dev` starts only the storefront and `npm run dev:api` only the API. Vite proxies `/api` to `localhost:4000`. Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Product images

Add photos with three steps (works for one image or a hundred):

1. Drop them into [`public/products/`](public/products), named after the product slug: `purity-made-cleanser.jpg`. For extra gallery shots add a number: `purity-made-cleanser-2.jpg`. Any of jpg / png / webp / avif is fine, and small typos are matched to the closest product (it tells you which).
2. `npm run images` (or `npm run images:dry` to preview). Each photo is resized, converted to an optimised `<slug>-<n>.webp`, the original is moved to `source-images/` (git-ignored) and [`data/products.json`](data/products.json) is updated so every product lists exactly the images that exist.
3. `npm --prefix server run seed` to push the change to MongoDB, then refresh the site.

Products without photos keep a tinted placeholder. To serve images from a CDN later, set `VITE_IMAGE_BASE=https://cdn.example.com` in `.env`.

## Connecting the cart to MongoDB later

All cart logic goes through the `CartApi` interface in [`src/cart/types.ts`](src/cart/types.ts). Two implementations live in [`src/cart/cartApi.ts`](src/cart/cartApi.ts):

- `local` (default): localStorage, no backend needed
- `http`: calls a REST API. Copy `.env.example` to `.env` and set `VITE_CART_BACKEND=http` and `VITE_API_URL`

Expected endpoints (each returns the full cart `{ lines, promoCode?, note? }`):

```
GET    /cart
POST   /cart/items           { productId, variant?, qty }
PATCH  /cart/items/:lineId   { qty }
DELETE /cart/items/:lineId
PUT    /cart/promo           { code }     DELETE /cart/promo
PUT    /cart/note            { note }
DELETE /cart
```

Suggested Mongo document (one per user or session cookie):

```js
{ _id, userId | sessionId, lines: [{ lineId, productId, variant, qty }], promoCode, note, updatedAt }
```

Only product slugs (`productId`) and quantities are stored. Prices, discounts and shipping are computed from the catalogue in [`src/cart/pricing.ts`](src/cart/pricing.ts) (a variant's own price wins over the product price); the server should re-compute them at checkout and never trust client totals.

## SEO & meta tags

Per-page tags (title, description, canonical, Open Graph, Twitter, product price meta, JSON-LD) are set with `react-helmet-async` through the [`Seo`](src/components/Seo.tsx) component. Set `VITE_SITE_URL` (e.g. `https://velvora.example`) in production so canonical/share URLs use the real domain. Filtered shop views and the cart are `noindex`.

Because routing is hash-based (`#/product/...`) and tags are set client-side, Google can read them but social scrapers (Facebook, WhatsApp, X) only see the defaults in `index.html`. For correct link previews, move to path routing plus server-side rendering or pre-rendering (e.g. Next.js, React Router framework mode, or a pre-render step).

## AI chat widget theme

The chat widget is themed per client from the chatbot's `Business.appearance` (colours, light/dark, blur, radius, font, avatar, position, welcome text, suggestions). Velvora's rose glass theme lives in [`chat-theme.json`](chat-theme.json); apply it from the chatbot repo with:

```
cd D:\MyProjects\chatbot\server
npx tsx scripts/setAppearance.ts velvora-local D:\GitHubPortfolio\velvora-cosmetics\chat-theme.json
```

Changes show up on the next page load, with no widget rebuild.

## Notes

- Product catalogue: [`data/products.json`](data/products.json) holds 100 products with rich details; [`server/`](server/README.md) has the Mongoose model, seed script, the REST API and MongoDB (local or Atlas) setup steps. The storefront loads the catalogue once from `GET /api/products` (`src/catalog/`).
- Category cards, hero and collection images are hot-linked from [Unsplash](https://unsplash.com) (see `src/data.ts`). Swap for your own assets before shipping.
- Fonts: Instrument Serif and Inter via Google Fonts. Icons: [React Icons](https://react-icons.github.io/react-icons/) (Feather, Font Awesome 6 and Lucide sets), re-exported by name from `src/components/Icons.tsx`.
- The checkout button is a stub, and the play button opens a placeholder modal.
