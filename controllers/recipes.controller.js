const { prisma } = require("../prisma/prisma-client");

const getAllRecipes = async(req, res) => {
    try {
        const recipes = await prisma.recipe.findMany();

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
        const recipe = await prisma.user.update({
            where: {
                id: req.user.id             //user приходит из auth
            },
            data: {
                createdRecipes: {
                    create: {
                        name,
                        category: await prisma.category.findUnique({
                            where:{
                                name: category
                            }
                        }),
                        ingredients: {      //!!!!сделать проверку на дубликаты - выбор существующей или создание новой записи или использовать upsert [{ create: {}, update{}}]
                            createMany: {
                                data: Promise.all(req.ingredients.map(async i => {
                                    return ({
                                        ingredient: await prisma.ingredient.findUnique({
                                            where: {
                                                name: i.ingredient
                                            }
                                        }),
                                        quantity: i.quantity
                                    })
                                })),
                                skipDuplicates: true,
                            }
                        },
                        description: description ? description : ''
                    }
                }
            }
        });

        return res.status(201).json(recipe);

    } catch (error) {
        res.status(400).json({message: "Не удалось создать рецепт"});
    }
}

const deleteRecipe = async(req, res) => {
    try {
        const recipe = await prisma.recipe.delete({
            where: {
                id: req.id
            }           
        });

        res.status(200).json({message: "Рецепт удален"});
    } catch (error) {
        res.status(400).json({message: "Не удалось удалить рецепт"});
    }
}

const editRecipe = async(req, res) => {
    try {
        const recipe = await prisma.recipe.update({
            where: {
                id: req.id
            },
            
        });

        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({message: "Не удалось получить рецепты"});
    }
}

module.exports = {
    getAllRecipes,
    getRecipe,
    createRecipe,
    deleteRecipe,
    editRecipe
}