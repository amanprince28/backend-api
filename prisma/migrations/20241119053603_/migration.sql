-- AlterTable
ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;

-- CreateTable
CREATE TABLE "bank" (
    "id" UUID NOT NULL,
    "bankName" VARCHAR(255) NOT NULL,
    "accountNo" VARCHAR(255) NOT NULL,
    "bankHolder" VARCHAR(255) NOT NULL,
    "bankCard" VARCHAR(255) NOT NULL,
    "pinNo" VARCHAR(255) NOT NULL,
    "remark" VARCHAR(255) NOT NULL,

    CONSTRAINT "bank_pkey" PRIMARY KEY ("id")
);
