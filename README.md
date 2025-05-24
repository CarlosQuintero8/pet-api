<<<<<<< HEAD
# 🐾 Pet API
## 📋 Descripción
Pet API es un servicio RESTful desarrollado con Node.js y TypeScript que permite gestionar publicaciones de mascotas perdidas. La aplicación proporciona funcionalidades para usuarios normales y administradores, incluyendo registro de usuarios, autenticación, verificación de correo electrónico y gestión completa de publicaciones de mascotas.

## ✨ Características
### 👤 Gestión de Usuarios
- 📝 Registro de usuarios
- ✉️ Verificación de correo electrónico
- 🔐 Autenticación con JWT
- 👑 Roles de usuario (normal y administrador)
### 🐶 Gestión de Mascotas
- 📌 Crear publicaciones de mascotas perdidas
- 🔍 Buscar todas las publicaciones o una específica
- ✏️ Actualizar información de mascotas (solo admin)
- ❌ Eliminar publicaciones (solo admin)
- ✅ Aprobar publicaciones (solo admin)
- ❎ Rechazar publicaciones (solo admin)
## 🛠️ Tecnologías
- Node.js : Entorno de ejecución
- TypeScript : Lenguaje de programación
- Express : Framework web
- TypeORM : ORM para base de datos
- PostgreSQL : Base de datos relacional
- JWT : Autenticación basada en tokens
- Bcrypt : Encriptación de contraseñas
- Nodemailer : Envío de correos electrónicos
- Class Validator : Validación de datos
- Class Transformer : Transformación de objetos
## 🏗️ Arquitectura
El proyecto sigue una arquitectura en capas:

- Presentación : Controladores, rutas y middlewares
- Dominio : DTOs y servicios de dominio
- Datos : Modelos y conexión a base de datos
- Configuración : Variables de entorno y configuraciones

## 📝 Endpoints API
### Usuarios
- POST /api/v1/users/register - Registrar usuario
- GET /api/v1/users/verify-email/:token - Verificar correo electrónico
- POST /api/v1/users/login - Iniciar sesión
### Mascotas (Acceso público)
- GET /api/v1/pets - Obtener todas las publicaciones aprobadas
- GET /api/v1/pets/:id - Obtener una publicación específica
### Mascotas (Requiere autenticación)
- POST /api/v1/pets - Crear una nueva publicación
### Mascotas (Solo administradores)
- PATCH /api/v1/pets/:id - Actualizar una publicación
- DELETE /api/v1/pets/:id - Eliminar una publicación
- PATCH /api/v1/pets/:id/approve - Aprobar una publicación
- PATCH /api/v1/pets/:id/reject - Rechazar una publicación
## 📄 Licencia
Este proyecto está bajo la Licencia ISC.
=======
🐾 Pet API 📖
Welcome to the Pet API, a RESTful API designed to help users manage pet-related posts (e.g., lost or found pets) and authenticate seamlessly! Built with ❤️ using TypeScript, Node.js, and PostgreSQL, this project aims to connect pet lovers and assist in reuniting pets with their owners. 🚀

✨ Features
User Authentication 🔑
Register and verify users and admins.
Secure login with JWT tokens.
Pet Post Management 🐶
Create, view, and manage pet posts (pending, approved, rejected).
Admin-only actions: approve, reject, modify, or delete posts.
Scalable & Maintainable ⚙️
TypeORM for database synchronization and migrations.
Clean architecture with DTOs and services.
API Documentation 📚
Comprehensive Postman collection with detailed endpoints.
🛠️ Installation
Follow these steps to set up the project locally:

Clone the Repository
bash

Copy
git clone https://github.com/your-username/pet-api.git
cd pet-api
Install Dependencies
bash

Copy
npm install
Set Up Environment Variables
Create a .env file in the root directory and add the following:
text

Copy
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=pet_api_db
JWT_SECRET=your_jwt_secret_key
PORT=3000
Set Up the Database
Ensure PostgreSQL is running.
Run the following to create the database:
sql

Copy
CREATE DATABASE pet_api_db;
Apply migrations (if configured):
bash

Copy
npx typeorm migration:run -d src/data-source.ts
Run the Project
bash

Copy
npm run dev
🚀 Usage
API Endpoints
The API is accessible at http://localhost:3000/api/v1. Below are some key endpoints:

Register User: POST /auth/register/user
Login User: POST /auth/login/user
Create Pet Post: POST /pets (requires authentication)
Approve Pet Post: PATCH /pets/:petId/approve (admin-only)
For a complete list of endpoints, refer to the API Documentation.

Testing
Use Postman to test the API. Import the Pet API Tests collection and set up the environment variables (e.g., {{userToken}}, {{adminToken}}).

📚 API Documentation
Check out the interactive API documentation published on Postman:

URL: Pet API Docs (Replace with your published URL)
Includes detailed descriptions, request examples, and response schemas for all endpoints.
To view or contribute to the documentation, ensure you have access to the Postman workspace.
>>>>>>> ed72f5fc68ea3e00d0b80b69a0a6202784e3050c

## 👨‍💻 Autor
Carlos Quintero

⭐️ ¡Si te gusta este proyecto, no olvides darle una estrella! ⭐️