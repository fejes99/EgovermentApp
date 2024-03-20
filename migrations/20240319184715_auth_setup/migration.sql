-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cityName_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cityName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cityName_fkey" FOREIGN KEY ("cityName") REFERENCES "City"("name") ON DELETE SET NULL ON UPDATE CASCADE;
