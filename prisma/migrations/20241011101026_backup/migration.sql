/*
  Warnings:

  - You are about to drop the column `recipeId` on the `Recipe_Ingredients` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_RecipeToRecipe_Ingredients" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RecipeToRecipe_Ingredients_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RecipeToRecipe_Ingredients_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe_Ingredients" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recipe_Ingredients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ingredientId" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "Recipe_Ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recipe_Ingredients" ("id", "ingredientId", "quantity") SELECT "id", "ingredientId", "quantity" FROM "Recipe_Ingredients";
DROP TABLE "Recipe_Ingredients";
ALTER TABLE "new_Recipe_Ingredients" RENAME TO "Recipe_Ingredients";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeToRecipe_Ingredients_AB_unique" ON "_RecipeToRecipe_Ingredients"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeToRecipe_Ingredients_B_index" ON "_RecipeToRecipe_Ingredients"("B");
