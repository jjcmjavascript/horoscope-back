/*
  Warnings:

  - Added the required column `requestData` to the `Tarot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tarot" ADD COLUMN     "requestData" TEXT NOT NULL;
