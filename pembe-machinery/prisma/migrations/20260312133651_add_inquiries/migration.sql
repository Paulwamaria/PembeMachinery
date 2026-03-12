/*
  Warnings:

  - The primary key for the `ShowcaseVideo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ShowcaseVideo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ShowcaseVideo" DROP CONSTRAINT "ShowcaseVideo_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "featured" SET DEFAULT false,
ALTER COLUMN "platform" DROP DEFAULT,
ALTER COLUMN "videoType" DROP DEFAULT,
ADD CONSTRAINT "ShowcaseVideo_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "company" TEXT,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "productId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
