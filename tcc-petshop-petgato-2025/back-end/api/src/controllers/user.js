const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcryptjs = require('bcryptjs');


const cadastro = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos!' });
        }

        // Compare a senha fornecida com a senha criptografada do banco de dados
        const isPasswordValid = await bcrypt.compare(senha, user.senha);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos!' });
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

    } catch (err) {
        res.status(500).json({ message: 'Erro interno do servidor', error: err.message });
    }
};




const create = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'E-mail já existe.' });
        }
        const hashedPassword = await bcryptjs.hash(senha, 10);

        const user = await prisma.user.create({
            data: {
                email: email,
                senha: hashedPassword,
            }
        });
        return res.status(201).json({ id: user.id, email: user.email });

    } catch (error) {
        return res.status(400).json({ error: 'Erro ao criar usuário', details: error.message });
    }
};


const read = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        if (req.body.senha) {
            const salt = await bcryptjs.genSalt(10);
            req.body.senha = await bcryptjs.hash(req.body.senha, salt);
        }

        const user = await prisma.user.update({
            where: { id: parseInt(req.params.id) },
            data: req.body,
        });

        return res.status(200).json({ id: user.id, email: user.email });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


const remove = async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: { id: parseInt(req.params.id) }
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { cadastro, create, read, update, remove };