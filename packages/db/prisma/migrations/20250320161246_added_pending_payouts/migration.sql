-- AlterTable
ALTER TABLE "Ticks" ALTER COLUMN "latency" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Validator" ADD COLUMN     "pendingPayout" INTEGER NOT NULL DEFAULT 0;
