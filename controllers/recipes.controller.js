const { prisma } = require("../prisma/prisma-client");

const getAllRecipes = async(req, res) => {
    try {
        const recipes = await prisma.recipe.findMany({
            select: {
                id: true,
                name: true,
                user: true,
                ingredients: {
                    select: {
                        ingredient: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({message: "Не удалось получить рецепты"});
    }
}

const getRecipe = async(req, res) => {
    try {
        const recipe = await prisma.recipe.findUnique({
            where: {
                id: req.id
            }
        });

        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({message: "Не удалось получить рецепт"});
    }
}



const createRecipe = async(req, res) => {
    try {
        const {name, category, description, ingredients } = req.body;
        //const { ingredient, quantity } = ingredients;

        if (!name || !category || !ingredients) {
            return res.status(400).json({message: "Заполните обязательные поля"});
        }
        const categoryRecipe = await prisma.category.findUnique({
            where: {
                name: category
            }
        });

        const ingredientsRecipe = await prisma.recipe_Ingredients.createMany(
            Promise.all(req.ingredients.map(async i => {
                return ({
                    data: {
                        ingredient: await prisma.ingredient.findUnique({
                            where: {
                                name: i.ingredient
                            }
                        }),
                        quantity: i.quantity
                    }
                })
            }))
        );

        const userId = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        });

        const recipe = await prisma.recipe.create({
            data: {
                name,
                category: categoryRecipe,
                ingredients: ingredientsRecipe,
                description: description ? description : '',
                userId
            }
        });

        return res.status(201).json(recipe);

    } catch (error) {
        res.status(400).json({message: "Не удалось создать рецепт"});
    }
}

const deleteRecipe = async(req, res) => {
    try {
        await prisma.recipe.delete({
            where: {
                id: req.body.id
            }           
        });

        res.status(204).json({message: "Рецепт удален"});
    } catch (error) {
        res.status(400).json({message: "Не удалось удалить рецепт"});
    }
}

const editRecipe = async(req, res) => {
    try {
        const data = req.body;
        const id = data.id;
        const recipe = await prisma.recipe.update({
            where: {
                id
            },
            data            
        });

        res.status(204).json(recipe);
    } catch (error) {
        res.status(400).json({message: "Не удалось изменить рецепт"});
    }
}

module.exports = {
    getAllRecipes,
    getRecipe,
    createRecipe,
    deleteRecipe,
    editRecipe
}