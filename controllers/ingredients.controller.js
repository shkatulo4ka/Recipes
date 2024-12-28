const { prisma } = require("../prisma/prisma-client");

const getAllIngredients = async(req, res) => {
    try {
        const ingredients = await prisma.ingredient.findMany();

        res.status(200).json(ingredients);
    } catch (error) {
        res.status(400).json({message: "Не удалось получить ингредиенты", errorMessage: error.message});
    }
}

const getIngredient = async(req, res) => {
    try {
        const ingredient = await prisma.ingredient.findUnique({
            where: {
                id: req.id
            }
        });

        res.status(200).json(ingredient);
    } catch (error) {
        res.status(400).json({message: "Не удалось получить ингредиенты", errorMessage: error.message});
    }
}

const createIngredient = async(req, res) => {
    try {
        const {name, price, kkal} = req.body;
        console.log(name, price, kkal);

        if (!name) {
            return res.status(400).json({message: "Введите название ингредиента", errorMessage: error.message});
        }

        const ingredient = await prisma.ingredient.create({
            data: {
                name,
                price,
                kkal
            }
        });

        return res.status(201).json(ingredient);

    } catch (error) {
        res.status(400).json({message: "Не удалось создать ингредиент", errorMessage: error.message});
    }
}

const deleteIngredient = async(req, res) => {
    try {
        await prisma.ingredient.delete({
            where: {
                id: req.body.id
            }           
        });

        res.status(204).json({message: "Ингредиент удален"});
    } catch (error) {
        res.status(400).json({message: "Не удалось удалить ингредиент", errorMessage: error.message});
    }
}

const editIngredient = async(req, res) => {
    try {
        const data = req.body;
        const id = data.id;
        const ingredient = await prisma.ingredient.update({
            where: {
                id
            },
            data            
        });

        res.status(204).json(ingredient);
    } catch (error) {
        res.status(400).json({message: "Не удалось изменить ингредиент"});
    }
}

module.exports = {
    getAllIngredients,
    getIngredient,
    createIngredient,
    deleteIngredient,
    editIngredient
}