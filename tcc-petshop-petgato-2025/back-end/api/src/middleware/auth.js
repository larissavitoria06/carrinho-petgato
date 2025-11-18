const jsonwebtoken = require("jsonwebtoken");
const bcryptjs = require('bcryptjs');

// Middleware para validar o token recebendo o token no cabeçalho
const validate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];  // Pega o token no cabeçalho

    if (!token) {
        return res.status(401).send({ message: "Access Denied. No token provided." }).end();
    }

    try {
        const payload = jsonwebtoken.verify(token, process.env.SECRET_JWT);  // Valida o token

        req.headers['user'] = payload;  // Armazena o payload no header para uso posterior
        next();  // Chama o próximo middleware
    } catch (err) {
        return res.status(500).send({ message: 'Erro ao validar token', error: err.message }).end();  // Melhor tratamento de erro
    }
}


// Middleware para validar o token recebendo o token no corpo da requisição
const validaToken = (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extrai o token do cabeçalho Authorization: Bearer <token>

    if (!token) {
        return res.status(401).send({ message: "Acesso negado. Nenhum token recebido." }).end();
    }

    jsonwebtoken.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (err) {
            return res.status(403).send({ valid: false, payload: null, message: "Token inválido." }).end();
        }
        res.status(200).json({ valid: true, payload: decoded }).end();
    });
}


//Criar um hash da senha Usado na criação de usuário e no login
const createHash = async (senha) => {
    if (!senha) return null;

    try {
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(senha, salt);
        return hash;
    } catch (error) {
        console.error('Erro ao criar hash:', error);
        throw new Error('Erro ao criar hash');
    }
}

//Validar a senha do usuário Usado no login
const validatePassword = async (senha, hash) => {
    if (!senha || !hash) return false;

    try {
        return await bcryptjs.compare(senha, hash);
    } catch (error) {
        console.error('Erro ao validar senha:', error);
        throw new Error('Erro ao validar senha');
    }
}

module.exports = {
    validate,
    validaToken,
    createHash,
    validatePassword
};