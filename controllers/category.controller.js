const { prisma } = require("../prisma/prisma-client");

const getAllCategories = async(req, res) => {
    try {
        const categories = await prisma.category.findMany();

        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({message: "Не удалось получить категории", errorMessage: error.message});
    }
}

module.exports = getAllCategories;