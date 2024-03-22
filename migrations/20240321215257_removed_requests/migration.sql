/*
  Warnings:

  - You are about to drop the column `requestId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `citizenId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_requestId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_citizenId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_processedById_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_serviceId_fkey";

-- DropIndex
DROP INDEX "Appointment_requestId_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "requestId",
ADD COLUMN     "citizenId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "processedById" INTEGER,
ADD COLUMN     "serviceId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Request";

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_processedById_fkey" FOREIGN KEY ("processedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
