const pool = require('../config/db');

// 1. OBTENER TODOS LOS USUARIOS (GET)
const obtenerUsuarios = async (req, res) => {
    try {
        // Usamos las columnas exactas: id, name, email, created_at
        const resultado = await pool.query('SELECT id, name, email, created_at FROM users ORDER BY id ASC');
        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
    }
};

// 2. OBTENER UN USUARIO POR ID (GET)
const obtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [id]);
        
        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        
        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el usuario', error: error.message });
    }
};

// 3. CREAR UN NUEVO USUARIO (POST)
const crearUsuario = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ mensaje: 'El nombre y el email son obligatorios' });
    }

    try {
        const existeEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existeEmail.rows.length > 0) {
            return res.status(400).json({ mensaje: 'El email ya se encuentra registrado' });
        }

        const resultado = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el usuario', error: error.message });
    }
};

// 4. ACTUALIZAR UN USUARIO (PUT)
const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ mensaje: 'El nombre y el email son obligatorios para actualizar' });
    }

    try {
        const resultado = await pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
            [name, email, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado para actualizar' });
        }

        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el usuario', error: error.message });
    }
};

// 5. ELIMINAR UN USUARIO (DELETE)
const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.status(200).json({ mensaje: `Usuario con ID ${id} eliminado correctamente` });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el usuario', error: error.message });
    }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};