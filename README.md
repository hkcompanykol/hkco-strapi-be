# HKCo Strapi BE

Strapi backend focused on:
- PostgreSQL persistence
- Cloudinary uploads
- Meilisearch indexing
- CRUD APIs for products and users

## APIs

### Products
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api/products/slug/:slug` (custom public route)

### Users
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

## Persistence
Both `product` and `user` are Strapi collection types, so create/update/delete operations are persisted to the configured PostgreSQL database via Strapi's Entity Service and query engine.

## Run
```bash
npm install
npm run develop
```
