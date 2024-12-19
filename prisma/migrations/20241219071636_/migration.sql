/*
  Warnings:

  - You are about to drop the column `loan_package` on the `loan` table. All the data in the column will be lost.
  - You are about to drop the column `payment_upfront` on the `loan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "loan" DROP COLUMN "loan_package",
DROP COLUMN "payment_upfront",
ADD COLUMN     "date_period" VARCHAR,
ADD COLUMN     "loan_remark" VARCHAR,
ADD COLUMN     "payment_up_front" VARCHAR,
ADD COLUMN     "unit_of_date" VARCHAR,
ALTER COLUMN "repayment_date" SET DATA TYPE VARCHAR,
ALTER COLUMN "principal_amount" SET DATA TYPE VARCHAR,
ALTER COLUMN "deposit_amount" SET DATA TYPE VARCHAR,
ALTER COLUMN "application_fee" SET DATA TYPE VARCHAR,
ALTER COLUMN "interest" SET DATA TYPE VARCHAR;
