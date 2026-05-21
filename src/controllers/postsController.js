const pool = require('../db/config');
const { isNotEmpty, isValidEmail } = require("../utils/validators");

// 1. OBTENER TODOS LOS POSTS (GET) - Incluye el nombre del autor usando JOIN
const obtenerPosts = async (req, res) => {
    try {
        const consulta = `
            SELECT *
            FROM posts
        
        `;
        const resultado = await pool.query(consulta);
        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los posts', error: error.message });
    }
};

// 2. OBTENER UN POST POR ID (GET)
const obtenerPostPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const consulta = `
            SELECT *
            FROM posts
            WHERE posts.id = $1
        `;
        const resultado = await pool.query(consulta, [id]);
        
        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Post no encontrado' });
        }
        
        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el post', error: error.message });
    }
};

// 3. CREAR UN NUEVO POST (POST) con validación de Clave Foránea
const crearPost = async (req, res) => {
    try {
    const { title, content, user_id } = req.body;
    if (!isNotEmpty(title) || !isNotEmpty(content)) {
      return res.status(400).json({
        error: "Título y contenido son obligatorios",
      });
    }

    if (!isValidId(author_id)) {
      return res.status(400).json({
        error: "author_id inválido",
      });
    }


        // Verificar si el usuario realmente existe antes de asignarle el post
        const usuarioExiste = await pool.query('SELECT * FROM usuarios WHERE id = $1', [user_id]);
        if (usuarioExiste.rows.length === 0) {
            return res.status(400).json({ mensaje: 'El user_id proporcionado no pertenece a ningún usuario existente' });
        }

        const resultado = await pool.query(
            'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
            [title, content, user_id]
        );
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el post', error: error.message });
    }
};

// 4. ACTUALIZAR UN POST (PUT)
const actualizarPost = async (req, res) => {
    try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    if (!isNotEmpty(title) || !isNotEmpty(content)) {
      return res.status(400).json({
        error: "Título y contenido son obligatorios",
      });
    }

    if (!isValidId(author_id)) {
      return res.status(400).json({
        error: "author_id inválido",
      });
    }

        const resultado = await pool.query(
            'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
            [title, content, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Post no encontrado para actualizar' });
        }

        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el post', error: error.message });
    }
};

// 5. ELIMINAR UN POST (DELETE)
const eliminarPost = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Post no encontrado' });
        }

        res.status(200).json({ mensaje: `Post con ID ${id} eliminado correctamente` });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el post', error: error.message });
    }
};

module.exports = {
    obtenerPosts,
    obtenerPostPorId,
    crearPost,
    actualizarPost,
    eliminarPost
};