-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_announceId_fkey";

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_announceId_fkey" FOREIGN KEY ("announceId") REFERENCES "announces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
