/*
  Warnings:

  - Changed the type of `fuel` on the `announces` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Fuel" AS ENUM ('FLEX', 'HIBRIDO', 'ELETRICO');

-- AlterTable
ALTER TABLE "announces" DROP COLUMN "fuel",
ADD COLUMN     "fuel" "Fuel" NOT NULL;
