/*
  Warnings:

  - You are about to drop the column `bithDate` on the `Tarot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tarot" DROP COLUMN "bithDate",
ADD COLUMN     "birthday" VARCHAR;
