/*
  Warnings:

  - You are about to drop the column `cuisineId` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Cuisine` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_cuisineId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "cuisineId";

-- CreateTable
CREATE TABLE "_CuisineToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CuisineToPost_AB_unique" ON "_CuisineToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CuisineToPost_B_index" ON "_CuisineToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Cuisine_title_key" ON "Cuisine"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_title_key" ON "Ingredient"("title");

-- AddForeignKey
ALTER TABLE "_CuisineToPost" ADD CONSTRAINT "_CuisineToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Cuisine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CuisineToPost" ADD CONSTRAINT "_CuisineToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
