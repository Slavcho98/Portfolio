# Velvora server (MongoDB layer)

Product model, seed script and connection check. The Express API comes next; everything here already talks to MongoDB through `MONGODB_URI`, so it works the same against local MongoDB and Atlas.

## Commands

```bash
cd server
npm install
npm run ping         # prints the (redacted) target, server version and existing collections
npm run seed         # upserts data/products.json by slug (safe to re-run)
npm run seed:fresh   # same, but empties the products collection first
npm run dev          # REST API on http://localhost:4000/api (restarts on change)
npm start            # same without file watching
```

## REST API

| Endpoint | Description |
| --- | --- |
| `GET /api/health` | `{ ok, database }` |
| `GET /api/products` | Paginated list in the light "card" shape. Query: `category`, `subcategory`, `brand`, `collection` (comma-separated allowed), `q`, `inStock=true`, `minPrice`, `maxPrice`, `sort` (`featured` · `popular` · `newest` · `price-asc` · `price-desc` · `rating` · `name`), `page`, `limit` (max 200), `view=full` for complete documents. Returns `{ items, total, page, pages, limit }` |
| `GET /api/products/:slug` | The complete product document (ingredients, how to use, fragrance notes, SEO…) or 404 |
| `GET /api/categories` | Per-category counts, price range and subcategories |
| `POST /api/orders` | Places an order (no payment provider, test store). Body: `{ customer, shippingAddress, lines: [{ productId, variant?, qty }], promoCode?, note? }`. Prices, stock, promo and shipping are recomputed from MongoDB, anything the browser sends about money is ignored. `201` with the saved order, `422 { message, fields }` for invalid input or unavailable items, `429` after 15 orders/hour per IP |
| `GET /api/orders/:orderNumber?email=` | Returns the order only when the number and the email it was placed with both match, else 404 |

Orders are stored in the `orders` collection (see `src/models/Order.js`). Stock is validated but not decremented, so the demo catalogue never runs dry. Totals logic lives in `src/lib/pricing.js` and mirrors `src/cart/pricing.ts`; change both together.

Set `PORT` (default 4000) and, if the storefront is hosted on another origin, `CORS_ORIGIN` in `server/.env`.

The seed validates every product against the Mongoose model before writing anything, and creates the indexes (unique `slug` / `sku`, weighted text search, category, brand, collections, price, popularity, newest, variant SKU).

## Local MongoDB (Compass)

`server/.env` already points at `mongodb://127.0.0.1:27017/velvora`. After seeding, open Compass, connect to `mongodb://127.0.0.1:27017` and browse `velvora → products`.

## MongoDB Atlas (free cluster)

1. Sign in at <https://cloud.mongodb.com> → **Create** a deployment → choose **Free (M0)**, pick a provider and the region closest to you, name it `Velvora`.
2. **Database Access** → *Add New Database User* → password authentication, user `velvora_app`, autogenerate a password and copy it. Role: *Read and write to any database*.
3. **Network Access** → *Add IP Address* → *Add Current IP Address*. (Avoid `0.0.0.0/0`; if you do use it for a quick test, remove it afterwards.)
4. **Database → Connect → Drivers** → copy the connection string, replace `<password>` with the real password (URL-encode special characters, e.g. `@` → `%40`) and put the database name before the `?`:

   ```
   mongodb+srv://velvora_app:<password>@cluster0.xxxxx.mongodb.net/velvora?retryWrites=true&w=majority&appName=Velvora
   ```
5. Paste it into `server/.env` as `MONGODB_URI=...` (this file is git-ignored; never commit it or share it), then:

   ```bash
   npm run ping
   npm run seed
   ```
6. Paste the same string into Compass → *New connection* to browse the Atlas data.

Keep a second line in `.env` (commented out) for whichever target you are not using, so switching is a one-line change.

## Product document

One document per product in `velvora.products`. Highlights beyond the basics:

| Area | Fields |
| --- | --- |
| Identity | `slug` (unique), `sku` (unique), `barcode`, `brand`, `category`, `subcategory`, `status` |
| Copy | `blurb`, `description`, `longDescription`, `highlights`, `benefits`, `howToUse`, `warnings` |
| Product facts | `keyIngredients[{name,purpose}]`, `suitableFor`, `concerns`, `finish`, `materials`, `includes`, `certifications`, `vegan`, `crueltyFree`, `fragrance{family,concentration,strength,longevity,notes{top,heart,base},occasion}` |
| Pricing | `price`, `priceMax`, `oldPrice`, `discountPercent`, `currency`, `taxClass`, `size` |
| Merchandising | `badges`, `tags`, `collections`, `featured`, `isNew`, `bestseller`, `popularity`, `stats{sold,views,wishlisted}`, `relatedSlugs` |
| Reviews | `rating`, `reviewCount`, `ratingBreakdown{1..5}` |
| Inventory | `stock`, `inStock`, `variantLabel`, `variants[{name,sku,barcode,swatch,price,stock}]` |
| Media & logistics | `images[{src,alt,width,height,role}]`, `packaging{widthMm,heightMm,depthMm,weightGrams,material}`, `shelfLifeMonths`, `madeIn` |
| SEO & dates | `seo{title,description,keywords}`, `launchDate`, `createdAt`, `updatedAt` |

All product data is fictional placeholder content (ingredients, claims, ratings, stock), not real formulations or regulatory claims.
