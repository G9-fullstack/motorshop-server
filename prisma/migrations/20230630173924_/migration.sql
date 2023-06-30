-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_announceId_fkey";

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_announceId_fkey" FOREIGN KEY ("announceId") REFERENCES "announces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
