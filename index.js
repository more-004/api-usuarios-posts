const app = require('./server');
const PORT = process.env.PORT || 3000;

// Arrancar el servidor de manera definitiva para producción o desarrollo local
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(` Servidor activo y corriendo en el puerto: ${PORT}`);
    console.log(` URL Local: http://localhost:${PORT}`);
    console.log(`==================================================`);
});