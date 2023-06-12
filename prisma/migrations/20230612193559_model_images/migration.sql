-- CreateTable
CREATE TABLE "images" (
    "id" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "announceId" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_announceId_fkey" FOREIGN KEY ("announceId") REFERENCES "announces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
