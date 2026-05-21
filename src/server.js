const express = require('express');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Importar las rutas modularizadas
const usuariosRoutes = require('./routes/usuariosRoutes');
const postsRoutes = require('./routes/postsRoutes');

// Inicializar
const app = express();

// Middleware
app.use(express.json());

// Swagger
const swaggerDocument = YAML.load('./openapi.yaml');
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));  

// Vincular las rutas
app.use('/api/users', usuariosRoutes);
app.use('/api/posts', postsRoutes);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// Ruta base de cortesía
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'Bienvenido a la API REST de Usuarios y Posts',
        estado: 'Online'
    });
});

const PORT = process.env.PORT || 3000;

// Arrancar el servidor de manera definitiva para producción o desarrollo local
app.listen(PORT, () => {
    console.log(` URL Local: http://localhost:${PORT}`);
    
});

// Exportamos la app
module.exports = app;