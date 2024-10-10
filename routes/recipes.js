const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getAllRecipes, getRecipe, createRecipe, deleteRecipe, editRecipe } = require('../controllers/recipes.controller');

router.get('/', auth, getAllRecipes);
router.get('/:id', auth, getRecipe);
router.post('/', auth, createRecipe);
router.delete('/remove/:id', auth, deleteRecipe);
router.put('/edit/:id', auth, editRecipe);

module.exports = router;

