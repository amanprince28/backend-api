/*
  Warnings:

  - You are about to drop the column `address` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `address` table. All the data in the column will be lost.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "public";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "state",
ADD COLUMN     "address-lines" VARCHAR(255),
ADD COLUMN     "city-id" UUID,
ADD COLUMN     "country-id" UUID,
ADD COLUMN     "state-id" UUID;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_city_fk" FOREIGN KEY ("city-id") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_country_fk" FOREIGN KEY ("country-id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_state_fk" FOREIGN KEY ("state-id") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
