const { Pool } = require('pg');
require('dotenv').config();

// Creamos una instancia de Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // 
  // 
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Función para verificar que la conexión sea exitosa al iniciar la app
const verificarConexion = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log(' Conexión exitosa a PostgreSQL. Hora del servidor:', res.rows[0].now);
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos PostgreSQL:', error.message);
    process.exit(1); // Detiene la aplicación si no se puede conectar
  }
};

verificarConexion();

module.exports = pool;