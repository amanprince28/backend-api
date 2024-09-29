-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- AlterTable
ALTER TABLE "address" ADD COLUMN     "address" VARCHAR(255),
ADD COLUMN     "city" VARCHAR(100),
ADD COLUMN     "country" VARCHAR(100),
ADD COLUMN     "customer-id" UUID,
ADD COLUMN     "cutomer-relation-id" UUID,
ADD COLUMN     "is-permanent" BOOLEAN DEFAULT false,
ADD COLUMN     "postal-code" VARCHAR(100),
ADD COLUMN     "remark" VARCHAR(255),
ADD COLUMN     "state" VARCHAR(100),
ADD COLUMN     "staying-since" VARCHAR(10);

-- AlterTable
ALTER TABLE "company" ADD COLUMN     "annual-income" VARCHAR(100),
ADD COLUMN     "business-type" VARCHAR(100),
ADD COLUMN     "department" VARCHAR(100),
ADD COLUMN     "employee-no" VARCHAR(100),
ADD COLUMN     "employee-type" VARCHAR(100),
ADD COLUMN     "income-date" VARCHAR(5),
ADD COLUMN     "income-type" VARCHAR(50),
ADD COLUMN     "name" VARCHAR(100),
ADD COLUMN     "occupation-category" VARCHAR(100),
ADD COLUMN     "position" VARCHAR(100),
ADD COLUMN     "remark" TEXT,
ADD COLUMN     "tel-code" VARCHAR(10),
ADD COLUMN     "tel-no" VARCHAR(12);

-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "car-plate" VARCHAR(50),
ADD COLUMN     "email" VARCHAR(100),
ADD COLUMN     "gender" VARCHAR(10),
ADD COLUMN     "ic" VARCHAR(100),
ADD COLUMN     "marital-status" VARCHAR(10),
ADD COLUMN     "mobile-no" VARCHAR(12),
ADD COLUMN     "name" VARCHAR(100),
ADD COLUMN     "no-of-child" BIGINT,
ADD COLUMN     "passport" VARCHAR(100),
ADD COLUMN     "race" VARCHAR(100),
ADD COLUMN     "tel-code" VARCHAR(5),
ADD COLUMN     "tel-no" VARCHAR(10);

-- AlterTable
ALTER TABLE "customer_relation" ADD COLUMN     "customer-id" UUID;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_customer_fk" FOREIGN KEY ("customer-id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_customer_relation_fk" FOREIGN KEY ("cutomer-relation-id") REFERENCES "customer_relation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer_relation" ADD CONSTRAINT "customer_relation_customer_fk" FOREIGN KEY ("customer-id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
