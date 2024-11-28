/*
  Warnings:

  - You are about to drop the column `car-plate` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `marital-status` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `mobile-no` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `no-of-child` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `tel-code` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `tel-no` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `customer-id` on the `document` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "document" DROP CONSTRAINT "document_customer-id_fkey";

-- AlterTable
ALTER TABLE "customer" RENAME COLUMN "car-plate" TO "car_plate",
RENAME COLUMN "marital-status" TO "marital_status",
RENAME COLUMN "mobile-no" TO "mobile_no",
RENAME COLUMN "no-of-child" TO "no_of_child",
RENAME COLUMN "tel-code" TO "tel_code",
RENAME COLUMN "tel-no" TO "tel_no";

-- AlterTable
ALTER TABLE "document" DROP COLUMN "customer-id",
ADD COLUMN     "customer_id" UUID;

-- CreateTable
CREATE TABLE "loan" (
    "id" UUID NOT NULL,
    "customer_id" UUID,
    "loan_package" VARCHAR(255),
    "repayment_date" VARCHAR(255),
    "principal_amount" VARCHAR(255),
    "deposit_amount" VARCHAR(255),
    "application_fee" VARCHAR(255),
    "payment_upfront" VARCHAR(255),
    "interest" VARCHAR(255),
    "remark" VARCHAR,
    "created_by" UUID,
    "supervisor" UUID,

    CONSTRAINT "loan_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_customer-id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_customer_fk" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
