/*
  Warnings:

  - You are about to drop the column `surrname` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "surrname",
ADD COLUMN     "surname" TEXT;
