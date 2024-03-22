/*
  Warnings:

  - You are about to drop the column `appointmentDate` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `appointmentEndDate` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appointmentStartDate` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "appointmentDate",
ADD COLUMN     "appointmentEndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "appointmentStartDate" TIMESTAMP(3) NOT NULL;
