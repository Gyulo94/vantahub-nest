/*
  Warnings:

  - Made the column `totalPages` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "totalPages" SET NOT NULL,
ALTER COLUMN "totalPages" SET DEFAULT 0;
