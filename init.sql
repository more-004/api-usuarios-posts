-- ==========================================
-- SCRIPT DE CONFIGURACIÓN Y SEMILLAS (SETUP & SEED)
-- ==========================================

-- 1. Eliminación previa de tablas en orden correcto por claves foráneas
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 2. Creación de la Tabla de Usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Creación de la Tabla de Posts
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- 4. Creación de Índices para optimizar búsquedas frecuentes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_id ON posts(user_id);

-- 5. Semillas de datos iniciales (Seed) para pruebas rápidas
INSERT INTO users (name, email) VALUES
('Juan Pérez', 'juan.perez@example.com'),
('María Gómez', 'maria.gomez@example.com'),
('Carlos Rodríguez', 'carlos.rod@example.com');

INSERT INTO posts (title, content, user_id) VALUES
('Mi Primer Post', 'Contenido del primer post redactado por Juan.', 1),
('Desarrollo con Node.js', 'Express es un framework minimalista excelente para APIs.', 1),
('Bases de Datos Relacionales', 'PostgreSQL es un motor potente y de código abierto.', 2);