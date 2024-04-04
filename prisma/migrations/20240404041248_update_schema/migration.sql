/*
  Warnings:

  - You are about to drop the column `upload` on the `Assestment` table. All the data in the column will be lost.
  - You are about to drop the `PeakTime` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PeakTime" DROP CONSTRAINT "PeakTime_storeId_fkey";

-- AlterTable
ALTER TABLE "Assestment" DROP COLUMN "upload";

-- DropTable
DROP TABLE "PeakTime";
