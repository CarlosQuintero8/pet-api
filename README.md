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
## 🚀 Instalación y Uso
### Requisitos previos
- Node.js (v14 o superior)
- PostgreSQL

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

## 👨‍💻 Autor
Carlos Quintero

⭐️ ¡Si te gusta este proyecto, no olvides darle una estrella! ⭐️