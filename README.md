# API REST de Gestión de Usuarios y Posts

Esta es una API REST modular construida con **Node.js**, **Express** y **PostgreSQL**. El proyecto permite gestionar un sistema relacional de usuarios y sus publicaciones (posts), implementando un diseño de base de datos robusto, controladores estructurados y una suite de pruebas unitarias y de integración automatizadas.

---

## Tecnologías Utilizadas

* **Backend:** Node.js v24+ & Express
* **Base de Datos:** PostgreSQL (Librería nativa `pg` con Pooling de conexiones)
* **Variables de Entorno:** Dotenv
* **Pruebas Automatizadas:** Jest & Supertest
* **Monitoreo local:** Nodemon
* **Especificación de API:** OpenAPI 3.0 (Swagger)

---

## Arquitectura del Proyecto

El proyecto sigue una estructura limpia y modular para separar las responsabilidades de manera profesional:

```text
api-usuarios-posts/
├── src/
│   ├── config/
│   │   └── db.js          # Configuración y Pool de conexión a PostgreSQL
│   ├── controllers/
│   │   ├── postsController.js
│   │   └── usuariosController.js
│   └── routes/
│       ├── postsRoutes.js
│       └── usuariosRoutes.js
├── .env                   # Variables de entorno (Local - Excluido en .gitignore)
├── .env.example           # Plantilla de ejemplo para variables de entorno
├── .gitignore             # Exclusión de archivos sensibles
├── app.test.js            # Pruebas automatizadas con Jest
├── index.js               # Punto de arranque del servidor (Puerto local/producción)
├── init.sql               # Script de creación de tablas, índices y semillas SQL
├── openapi.yaml           # Documentación técnica bajo el estándar OpenAPI
├── package.json           # Dependencias y scripts del proyecto
└── server.js              # Configuración y middlewares de la app Express

---

## URL de deploy de Railway 
https://api-usuarios-posts-production.up.railway.app/api-docs/