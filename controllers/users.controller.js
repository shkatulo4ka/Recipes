const bcrypt = require('bcrypt') ;

const { prisma } = require("../prisma/prisma-client");
const jwt = require('jsonwebtoken');


const login = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({message: "Пожалуйста, заполните обязательные поля"})
    }

    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });

    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));

    if (isPasswordCorrect) {
        res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name
        })
    } else {
        return res.status(400).json({message: "Введен неверный логин или пароль"})
    }
    
}

/**
* @route POST /api/user/register
* @desc Регистрация
*/
const register = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.send(400).json({message: "Пожалуйста, заполните обязательные поля"})
    }

    const registeredUser = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (registeredUser) {
        return res.status(400).json({message: "Пользователь с таким email уже существует"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
        res.status(201).json({
            id: (await user).id,
            email: (await user).email,
            name,
            token: jwt.sign({ id: user.id }, secret, {expiresIn: '30d'})
        })
    } else {
        return res.status(400).json({message: "Не удалось создать пользователя"})
    }
}

const current = async (req, res) => {
    
}

module.exports = {
    login,
    register,
    current
}