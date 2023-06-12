-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "zipCode" VARCHAR(8) NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "city" VARCHAR(127) NOT NULL,
    "street" VARCHAR(127) NOT NULL,
    "number" VARCHAR(10) NOT NULL,
    "complement" VARCHAR(127) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);
