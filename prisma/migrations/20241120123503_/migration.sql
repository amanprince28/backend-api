-- CreateTable
CREATE TABLE "document" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "customer-id" UUID,

    CONSTRAINT "document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_customer-id_fkey" FOREIGN KEY ("customer-id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
