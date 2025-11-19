const express = require('express');
const routes = express.Router();

const User = require('./controllers/user.js');
const Consulta = require('./controllers/consulta.js');
const Login = require('./controllers/login.js');
const auth = require('./middleware/auth.js');
const Produto = require('./controllers/produto.js');

routes.get('/', (req, res) => {
    const api = {
        titulo: 'API Pet Shop',
        versao: '2.0.0',
        rotas: [
            { metodo: 'GET', caminho: '/cadastro' },
            { metodo: 'GET', caminho: '/cadastro/:id' },
            { metodo: 'POST', caminho: '/cadastro' },
            { metodo: 'PATCH', caminho: '/cadastro/:id' },
            { metodo: 'DELETE', caminho: '/cadastro/:id' },

            { metodo: 'POST', caminho: '/login' },
            { metodo: 'POST', caminho: '/logado' },

            { metodo: 'GET', caminho: '/usuarios' },
            { metodo: 'GET', caminho: '/usuarios/:id' },
            { metodo: 'POST', caminho: '/usuarios' },
            { metodo: 'PATCH', caminho: '/usuarios/:id' },
            { metodo: 'DELETE', caminho: '/usuarios/:id' },

            { metodo: 'GET', caminho: '/consultas' },
            { metodo: 'POST', caminho: '/consultas' },
            { metodo: 'PATCH', caminho: '/consultas/:id' },
            { metodo: 'DELETE', caminho: '/consultas/:id' },

            { metodo: 'GET', caminho: '/produto' },
            { metodo: 'GET', caminho: '/produto/:id' },
            { metodo: 'POST', caminho: '/produto' },
            { metodo: 'PATCH', caminho: '/produto/:id' },
            { metodo: 'DELETE', caminho: '/produto/:id' }
        ]
    }
    res.json(api);
});

routes.post('/cadastro', User.create);
routes.get('/cadastro', User.read);
routes.get('/cadastro/:id', User.read);
routes.patch('/cadastro/:id', User.update); 
routes.delete('/cadastro/:id', User.remove);

routes.post('/login', Login.login);//post do token
routes.post('/logado', auth.validaToken);

routes.get('/usuarios', auth.validate, Login.read);
routes.get('/usuarios/:id', Login.read);
routes.post('/usuarios', Login.create);
routes.patch('/usuarios/:id', auth.validate, Login.update);
routes.delete('/usuarios/:id', auth.validate, Login.del);

routes.post('/consultas', Consulta.create);
routes.get('/consultas', Consulta.read);
routes.patch('/consultas/:id', Consulta.update);
routes.delete('/consultas/:id', Consulta.remove);

routes.post('/produto', Produto.create);
routes.get('/produto', Produto.read);
routes.get('/produto/:id', Produto.readById);
routes.patch('/produto/:id', Produto.update);
routes.delete('/produto/:id', Produto.remove);
routes.get('/produto', Produto.buscarProdutos);
module.exports = routes;