/*
  Warnings:

  - You are about to drop the column `assestmenSummary` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assestmentsSummary` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_storeId_fkey";

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "assestmenSummary",
ADD COLUMN     "assestmentsSummary" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "PeakTime" (
    "id" UUID NOT NULL,
    "storeId" UUID,

    CONSTRAINT "PeakTime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PeakTime" ADD CONSTRAINT "PeakTime_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
