/*
  Warnings:

  - You are about to alter the column `no-of-child` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "address" ALTER COLUMN "address-lines" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "customer" ALTER COLUMN "no-of-child" SET DATA TYPE INTEGER;
