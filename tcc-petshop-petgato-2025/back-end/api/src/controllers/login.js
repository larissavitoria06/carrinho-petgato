const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jsonwebtoken = require("jsonwebtoken");
const Middlewares = require('../middleware/auth');

const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            }
        });

        if (!user) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos!' });
        } else {
            const isValidsenha = await Middlewares.validatePassword(senha, user.senha);
            if (!isValidsenha) {
                return res.status(401).json({ message: 'E-mail ou senha incorretos!' }).end();
            }
            const token = jsonwebtoken.sign(
                {
                    id: user.id,
                    nome: user.nome,
                    email: user.email,
                },
                process.env.SECRET_JWT || 'meu_segredo_jwt',
                { expiresIn: "30min" }
            );
            res.status(200).json({ token: token });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erro interno do servidor', error: err.message });
    }
};

const read = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar user' });
    }
}

const create = async (req, res) => {
    try {
        req.body.senha = await Middlewares.createHash(req.body.senha);
        const user = await prisma.user.create({
            data: req.body
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar user', details: error.message });
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: req.body
        });
        res.status(202).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar user', details: error.message });
    }
}

const del = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar user', details: error.message });
    }
}

module.exports = {
    login,
    read,
    create,
    update,
    del
};