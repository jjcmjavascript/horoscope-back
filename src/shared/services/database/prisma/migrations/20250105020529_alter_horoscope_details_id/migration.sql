-- AlterTable
CREATE SEQUENCE horoscopedetail_id_seq;
ALTER TABLE "HoroscopeDetail" ALTER COLUMN "id" SET DEFAULT nextval('horoscopedetail_id_seq');
ALTER SEQUENCE horoscopedetail_id_seq OWNED BY "HoroscopeDetail"."id";
