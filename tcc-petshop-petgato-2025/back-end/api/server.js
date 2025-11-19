const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const routes = require('./src/routes.js');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);


   // Servidor rodando
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});



