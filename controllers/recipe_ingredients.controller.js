const { prisma } = require("../prisma/prisma-client");

/**
 * @route POST /api/recipe_ingredient/add
 * @desc Добавление ингредиента
 */

const createRecipeIngredient = async(req, res) => {
    try {
        const data = req.body;
        
        if (!data.ingredientID) {
            return res.status(400).json({message: "Не указан игредиент"});
        }
        
        const recipe_ingredient = await prisma.recipe_Ingredients.create({
            data: {
                ...data
            }
        });

        return res.status(201).json(recipe);

    } catch (error) {
        res.status(400).json({message: "Не удалось создать запись"});
    }
}

module.exports = {
    createRecipeIngredient
}
