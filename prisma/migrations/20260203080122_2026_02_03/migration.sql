-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Book_reviewCount_idx" ON "Book"("reviewCount");
