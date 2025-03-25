/*
  Warnings:

  - You are about to drop the column `tickId` on the `Ticks` table. All the data in the column will be lost.
  - Added the required column `latency` to the `Ticks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Ticks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validatorId` to the `Ticks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TicksStatus" AS ENUM ('good', 'bad');

-- AlterTable
ALTER TABLE "Ticks" DROP COLUMN "tickId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "latency" INTEGER NOT NULL,
ADD COLUMN     "status" "TicksStatus" NOT NULL,
ADD COLUMN     "validatorId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Validator" (
    "id" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Validator_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticks" ADD CONSTRAINT "Ticks_validatorId_fkey" FOREIGN KEY ("validatorId") REFERENCES "Validator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
