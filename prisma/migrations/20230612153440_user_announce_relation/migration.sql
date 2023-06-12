/*
  Warnings:

  - Added the required column `sellerId` to the `announces` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announces" ADD COLUMN     "sellerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "announces" ADD CONSTRAINT "announces_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
