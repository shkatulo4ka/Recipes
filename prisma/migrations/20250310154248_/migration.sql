/*
  Warnings:

  - You are about to drop the `_CategoryToRecipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RecipeToRecipe_Ingredients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_CategoryToRecipe_B_index";

-- DropIndex
DROP INDEX "_CategoryToRecipe_AB_unique";

-- DropIndex
DROP INDEX "_RecipeToRecipe_Ingredients_B_index";

-- DropIndex
DROP INDEX "_RecipeToRecipe_Ingredients_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CategoryToRecipe";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_RecipeToRecipe_Ingredients";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL,
    "kkal" REAL NOT NULL DEFAULT 0
);
INSERT INTO "new_Ingredient" ("id", "kkal", "name", "price") SELECT "id", "kkal", "name", "price" FROM "Ingredient";
DROP TABLE "Ingredient";
ALTER TABLE "new_Ingredient" RENAME TO "Ingredient";
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");
CREATE TABLE "new_Recipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "kkal" REAL,
    "userId" TEXT NOT NULL,
    "categoryID" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Recipe_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("created_at", "description", "id", "kkal", "name", "userId") SELECT "created_at", "description", "id", "kkal", "name", "userId" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
CREATE UNIQUE INDEX "Recipe_name_key" ON "Recipe"("name");
CREATE TABLE "new_Recipe_Ingredients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipeID" TEXT,
    "ingredientId" TEXT NOT NULL,
    "quantity" REAL,
    CONSTRAINT "Recipe_Ingredients_recipeID_fkey" FOREIGN KEY ("recipeID") REFERENCES "Recipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Recipe_Ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recipe_Ingredients" ("id", "ingredientId", "quantity") SELECT "id", "ingredientId", "quantity" FROM "Recipe_Ingredients";
DROP TABLE "Recipe_Ingredients";
ALTER TABLE "new_Recipe_Ingredients" RENAME TO "Recipe_Ingredients";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
