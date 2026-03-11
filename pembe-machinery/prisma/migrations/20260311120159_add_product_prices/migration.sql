-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'KES',
ADD COLUMN     "price" DECIMAL(12,2),
ADD COLUMN     "priceOnRequest" BOOLEAN NOT NULL DEFAULT false;
