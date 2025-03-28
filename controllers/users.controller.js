const bcrypt = require('bcrypt') ;

const { prisma } = require("../prisma/prisma-client");
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;



const login = async(req, res) => {
    try {
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
    
        if (user && isPasswordCorrect && secret) {
            res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
                token: jwt.sign({ id: user.id }, secret, {expiresIn: '30d'})
            })
        } else {
            return res.status(400).json({message: "Введен неверный логин или пароль"})
        }
    } catch (error) {
        return res.status(500).json({message: "Что-то пошло не так"})

    }
    
}

/**
* @route POST /api/user/register
* @desc Регистрация
*/
const register = async (req, res) => {
    try {
        const { email, name, password }= req.body;
        if (!email || !password || !name) {
            return res.status(400).json({message: "Пожалуйста, заполните обязательные поля"})
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
    } catch (error) {
        return res.status(500).json({message: "Что-то пошло не так"})
    }
}

const current = async (req, res) => {
    return res.status(200).json(req.user)
}

module.exports = {
    login,
    register,
    current
}