/*
  Warnings:

  - You are about to drop the column `relation` on the `customer_relation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "address" ALTER COLUMN "staying-since" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "customer_relation" DROP COLUMN "relation",
ADD COLUMN     "relationship" VARCHAR(100);
