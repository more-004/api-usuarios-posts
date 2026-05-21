-- 5. Semillas de datos iniciales (Seed) para pruebas rápidas
INSERT INTO users (name, email) VALUES
('Juan Pérez', 'juan.perez@example.com'),
('María Gómez', 'maria.gomez@example.com'),
('Carlos Rodríguez', 'carlos.rod@example.com');

INSERT INTO posts (title, content, user_id) VALUES
('Mi Primer Post', 'Contenido del primer post redactado por Juan.', 1),
('Desarrollo con Node.js', 'Express es un framework minimalista excelente para APIs.', 1),
('Bases de Datos Relacionales', 'PostgreSQL es un motor potente y de código abierto.', 2);