-- AlterTable
ALTER TABLE "company" ADD COLUMN     "customer-id" UUID;

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_customer_fk" FOREIGN KEY ("customer-id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
