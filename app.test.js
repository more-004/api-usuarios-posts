const request = require('supertest');
const app = require('./server'); // Importamos nuestra app de Express
const pool = require('./src/config/db'); // Importamos la conexión de la base de datos

describe('Pruebas unitarias y de integración de la API', () => {
    
    // Al finalizar todos los tests, cerramos la piscina de conexiones a la base de datos
    // Si no hacemos esto, el proceso de Jest se quedará abierto para siempre
    afterAll(async () => {
        await pool.end();
    });

    // TEST 1: Verificar la ruta raíz (/)
    it('Debería responder con un mensaje de bienvenida en la raíz', async () => {
        const respuesta = await request(app).get('/');
        
        expect(respuesta.statusCode).toBe(200);
        expect(respuesta.body).toHaveProperty('estado', 'Online');
    });

    // TEST 2: Verificar el endpoint de usuarios (GET /api/users)
    it('Debería obtener la lista de usuarios correctamente con estado 200', async () => {
        const respuesta = await request(app).get('/api/users');
        
        expect(respuesta.statusCode).toBe(200);
        // Verificamos que lo que devuelva sea un arreglo (Array) de datos
        expect(Array.isArray(respuesta.body)).toBe(true);
    });
});