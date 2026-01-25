/*
  Warnings:

  - You are about to drop the column `pdfUrl` on the `Book` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pdfId]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "pdfUrl",
ADD COLUMN     "pdfId" UUID;

-- CreateTable
CREATE TABLE "Pdf" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pdf_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_pdfId_key" ON "Book"("pdfId");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_pdfId_fkey" FOREIGN KEY ("pdfId") REFERENCES "Pdf"("id") ON DELETE SET NULL ON UPDATE CASCADE;
