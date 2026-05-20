const express = require('express');
require('dotenv').config();

// Importar las rutas modularizadas
const usuariosRoutes = require('./src/routes/usuariosRoutes');
const postsRoutes = require('./src/routes/postsRoutes');

// Inicializar la aplicación Express
const app = express();

// Middleware esencial para leer JSON
app.use(express.json());

// Ruta base de cortesía
app.get('/', (req, res) => {
    res.status(200).json({ 
        mensaje: 'Bienvenido a la API REST de Usuarios y Posts',
        estado: 'Online'
    });
});

// Vincular las rutas
app.use('/api/users', usuariosRoutes);
app.use('/api/posts', postsRoutes);

// Exportamos la app (Sin encenderla con listen todavía)
module.exports = app;