/*
  Warnings:

  - Changed the type of `fuel` on the `announces` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "announces" DROP COLUMN "fuel",
ADD COLUMN     "fuel" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Brand";

-- DropEnum
DROP TYPE "Fuel";
