/*
  Warnings:

  - You are about to drop the column `amount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the `_IngredientToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_IngredientToPost" DROP CONSTRAINT "_IngredientToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToPost" DROP CONSTRAINT "_IngredientToPost_B_fkey";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "amount";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "description" TEXT,
ADD COLUMN     "ingredients" TEXT[];

-- DropTable
DROP TABLE "_IngredientToPost";
