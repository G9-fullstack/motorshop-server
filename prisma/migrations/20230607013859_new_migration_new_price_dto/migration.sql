/*
  Warnings:

  - You are about to alter the column `price` on the `announces` table. The data in that column could be lost. The data in that column will be cast from `Decimal(11,2)` to `Integer`.
  - Changed the type of `brand` on the `announces` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "announces" DROP COLUMN "brand",
ADD COLUMN     "brand" TEXT NOT NULL,
ALTER COLUMN "price" SET DATA TYPE INTEGER;
