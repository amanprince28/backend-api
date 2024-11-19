-- AlterTable
ALTER TABLE "bank" ADD COLUMN     "customer-id" UUID;

-- AddForeignKey
ALTER TABLE "bank" ADD CONSTRAINT "bank_customer-id_fkey" FOREIGN KEY ("customer-id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
