const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { createRecipeIngredient } = require('../controllers/recipe_ingredients.controller');


router.post('/add', auth, createRecipeIngredient);

module.exports = router;