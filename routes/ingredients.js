const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getAllIngredients, getIngredient, createIngredient, deleteIngredient, editIngredient } = require('../controllers/ingredients.controller');

router.get('/', auth, getAllIngredients);
router.get('/:id', auth, getIngredient);
router.post('/', auth, createIngredient);
router.delete('/remove/:id', auth, deleteIngredient);
router.put('/edit/:id', auth, editIngredient);

module.exports = router;