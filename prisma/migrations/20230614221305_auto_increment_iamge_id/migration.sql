-- AlterTable
CREATE SEQUENCE images_id_seq;
ALTER TABLE "images" ALTER COLUMN "id" SET DEFAULT nextval('images_id_seq');
ALTER SEQUENCE images_id_seq OWNED BY "images"."id";
