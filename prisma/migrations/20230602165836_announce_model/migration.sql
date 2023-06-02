-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('chevrolet', 'citroen', 'fiat', 'ford', 'honda', 'hyundai', 'nissan', 'peugeot', 'renault', 'toyota', 'volkswagen');

-- CreateTable
CREATE TABLE "announces" (
    "id" SERIAL NOT NULL,
    "brand" "Brand" NOT NULL,
    "model" VARCHAR(127) NOT NULL,
    "year" VARCHAR(4) NOT NULL,
    "mileage" VARCHAR(10) NOT NULL,
    "fuel" INTEGER NOT NULL,
    "color" VARCHAR(25) NOT NULL,
    "price" DECIMAL(11,2) NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "announces_pkey" PRIMARY KEY ("id")
);
