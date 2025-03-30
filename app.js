const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', require('./routes/users'));
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/ingredients', require('./routes/ingredients'));
app.use('/api/recipe_ingredient', require('./routes/recipe_ingredients'));
app.use('/api/categories', require('./routes/categories'))


module.exports = app;
