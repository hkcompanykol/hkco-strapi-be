# HKCo Strapi BE

Production-grade Strapi backend for a scalable product catalogue system.

## Project overview

- Strapi v4 backend
- PostgreSQL (no SQLite runtime setup)
- REST API-first
- Meilisearch-ready product indexing
- Local uploads (dev) + Cloudinary-ready provider config (prod)

## Architecture

```text
Clients (Next.js / mobile / partner apps)
        |
        v
   Strapi REST API
   |      |      \
   |      |       +--> External Services (Meilisearch / Cloudinary)
   |      |
   |      +----------> Helpers (constants)
   |
   +-----------------> PostgreSQL
```

## Folder structure

```text
.
├── config/
│   ├── admin.js
│   ├── api.js
│   ├── database.js
│   ├── middlewares.js
│   ├── plugins.js
│   ├── server.js
│   └── env/
├── database/
│   └── models/
├── docs/
│   └── postman/
├── helpers/
│   └── constants/
├── scripts/
├── services/
│   └── external/
├── src/
│   ├── api/
│   └── components/
└── public/uploads/
```

## Setup (local)

```bash
npm install
cp .env.example .env
npm run develop
```

Optional seed:

```bash
npm run seed
```

## Production

```bash
npm run build
npm run start
```

Set `NODE_ENV=production` with managed PostgreSQL and Meilisearch.

## Environment variables

See `.env.example` for complete reference.

Required highlights:
- `DATABASE_URL`
- `APP_KEYS`
- `JWT_SECRET`
- `ADMIN_JWT_SECRET`
- `API_TOKEN_SALT`
- `TRANSFER_TOKEN_SALT`
- `MEILISEARCH_HOST`

Optional:
- `UPLOAD_PROVIDER=cloudinary`
- `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET`

## API examples

- `GET /api/products`
- `GET /api/products/:slug`
- `GET /api/categories`
- `GET /api/brands`

Filtering/pagination example:

```http
GET /api/products?filters[category][slug][$eq]=laptops&filters[brand][slug][$eq]=novatech&filters[price][$gte]=100&pagination[page]=1&pagination[pageSize]=20&sort[0]=price:asc
```

## Postman

Import:
- `docs/postman/product-catalogue.postman_collection.json`

## Seed data

Script: `scripts/seed.js`
- 5 categories
- 4 brands
- 12 products

## Deployment (Railway / Render)

1. Provision PostgreSQL.
2. Provision Strapi web service from this repo.
3. Set all required env vars.
4. Add Meilisearch service and set `MEILISEARCH_HOST`.
5. For CDN image delivery, use Cloudinary provider.
6. Build/start commands:
   - `npm run build`
   - `npm run start`

## Scaling notes

- API limits in `config/api.js` (`defaultLimit=20`, `maxLimit=100`).
- Use selective `populate` to keep payloads small.
- Use Meilisearch for full-text and faceted search.
- Add edge caching/CDN for media and frequently-read endpoints.
- Apply DB indexes from `database/models/catalog-indexes.sql` in large datasets.
