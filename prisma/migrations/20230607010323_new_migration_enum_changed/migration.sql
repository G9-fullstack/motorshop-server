/*
  Warnings:

  - The values [chevrolet,citroen,fiat,ford,honda,hyundai,nissan,peugeot,renault,toyota,volkswagen] on the enum `Brand` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Brand_new" AS ENUM ('CHEVROLET', 'CITROEN', 'FIAT', 'FORD', 'HONDA', 'HYUNDAI', 'NISSAN', 'PEUGEOT', 'RENAULT', 'TOYOTA', 'VOLKSWAGEN');
ALTER TABLE "announces" ALTER COLUMN "brand" TYPE "Brand_new" USING ("brand"::text::"Brand_new");
ALTER TYPE "Brand" RENAME TO "Brand_old";
ALTER TYPE "Brand_new" RENAME TO "Brand";
DROP TYPE "Brand_old";
COMMIT;
