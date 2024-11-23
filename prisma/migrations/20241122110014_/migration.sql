/*
  Warnings:

  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bank` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customer_relation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_city_fk";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_country_fk";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_customer_fk";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_customer_relation_fk";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_state_fk";

-- DropForeignKey
ALTER TABLE "bank" DROP CONSTRAINT "bank_customer-id_fkey";

-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_customer_fk";

-- DropForeignKey
ALTER TABLE "customer_relation" DROP CONSTRAINT "customer_relation_customer_fk";

-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "bank_details" JSONB,
ADD COLUMN     "created_by" UUID,
ADD COLUMN     "customer_address" JSONB,
ADD COLUMN     "employment" JSONB,
ADD COLUMN     "relations" JSONB,
ADD COLUMN     "supervisor" UUID;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "supervisor" UUID;

-- DropTable
DROP TABLE "address";

-- DropTable
DROP TABLE "bank";

-- DropTable
DROP TABLE "company";

-- DropTable
DROP TABLE "customer_relation";
