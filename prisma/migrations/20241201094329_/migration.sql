-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'LEAD', 'AGENT');

-- CreateTable
CREATE TABLE "customer" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255),
    "gender" VARCHAR(255),
    "ic" VARCHAR(255),
    "name" VARCHAR(255),
    "passport" VARCHAR(255),
    "race" VARCHAR(255),
    "deleted_at" TIMESTAMP(3),
    "bank_details" JSONB,
    "created_by" UUID,
    "customer_address" JSONB,
    "employment" JSONB,
    "relations" JSONB,
    "supervisor" UUID,
    "car_plate" VARCHAR(255),
    "marital_status" VARCHAR(255),
    "mobile_no" VARCHAR(255),
    "no_of_child" INTEGER,
    "tel_code" VARCHAR(255),
    "tel_no" VARCHAR(255),
    "status" VARCHAR(255),
    "remarks" JSONB,

    CONSTRAINT "customer_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "country_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "state" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "country_id" UUID NOT NULL,

    CONSTRAINT "state_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "state_id" UUID NOT NULL,

    CONSTRAINT "city_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" DEFAULT 'AGENT',
    "supervisor" UUID,
    "name" VARCHAR(255),
    "status" BOOLEAN DEFAULT true,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "customer_id" UUID,

    CONSTRAINT "document_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "state" ADD CONSTRAINT "state_country_fk" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_state_fk" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_customer-id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_customer_fk" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
