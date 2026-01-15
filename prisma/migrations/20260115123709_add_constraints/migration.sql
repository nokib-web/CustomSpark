-- This is an empty migration.
-- Add constraints
ALTER TABLE "items" ADD CONSTRAINT "items_price_check" CHECK (price > 0);
ALTER TABLE "items" ADD CONSTRAINT "items_stock_check" CHECK (stock >= 0);