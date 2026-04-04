-- Recommended indexes for large catalog workloads (execute manually on PostgreSQL)
CREATE INDEX IF NOT EXISTS idx_products_slug ON products (slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_products_sku ON products (sku);
CREATE INDEX IF NOT EXISTS idx_products_price ON products (price);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products (is_active);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories (slug);
CREATE INDEX IF NOT EXISTS idx_brands_slug ON brands (slug);
