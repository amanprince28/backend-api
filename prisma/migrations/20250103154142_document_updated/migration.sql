/*
  Warnings:

  - Added the required column `description` to the `document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "document" ADD COLUMN     "description" VARCHAR(255) NOT NULL,
ADD COLUMN     "size" VARCHAR(255) NOT NULL;
