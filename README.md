# 🐾 API de Mascotas Perdidas

## 📋 Descripción
API RESTful para gestionar publicaciones de mascotas perdidas. Permite a los usuarios registrarse, crear publicaciones sobre sus mascotas perdidas, y a los administradores aprobar o rechazar estas publicaciones.

## 🚀 Características
- ✅ Gestión completa de publicaciones de mascotas (CRUD)
- 👤 Sistema de usuarios con registro y autenticación
- 🔍 Búsqueda de mascotas por ID
- 👮 Flujo de aprobación/rechazo de publicaciones
- 🔒 Arquitectura orientada a servicios

## 🛠️ Tecnologías
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)

## 📦 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/CarlosQuintero8/pet-api.git
cd pet-api
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
PORT=3000
NODE_ENV=development
DATABASE_USERNAME=tu_usuario
DATABASE_PASSWORD=tu_contraseña
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=pet_api_db
```

4. Iniciar la aplicación en modo desarrollo:
```bash
npm run dev
```

## 🏗️ Estructura del Proyecto

```
src/
├── app.ts                  # Punto de entrada de la aplicación
├── config/                 # Configuración de la aplicación
├── data/                   # Capa de datos y modelos
│   └── postgres/
│       └── models/
│           ├── pet-post.model.ts
│           └── user.model.ts
└── presentation/           # Capa de presentación
    ├── server.ts           # Configuración del servidor Express
    ├── routes.ts           # Rutas principales
    ├── pets/               # Módulo de mascotas
    │   ├── controller.ts
    │   ├── routes.ts
    │   └── services/
    │       ├── create-pet.service.ts
    │       ├── finder-pet.service.ts
    │       ├── update-pet.service.ts
    │       ├── delete-pet.service.ts
    │       ├── approved-pet.service.ts
    │       └── rejected-pet.service.ts
    └── user/               # Módulo de usuarios
        ├── controller.ts
        ├── routes.ts
        └── services/
            ├── creator-user.service.ts
            ├── login-user.service.ts
            └── finder-user.service.ts
```

## 📝 Endpoints API

### Mascotas
- `GET /api/petposts` - Obtener todas las mascotas
- `GET /api/petposts/:id` - Obtener mascota por ID
- `POST /api/petposts` - Crear nueva mascota
- `PATCH /api/petposts/:id` - Actualizar mascota
- `DELETE /api/petposts/:id` - Eliminar mascota
- `PATCH /api/petposts/:id/approve` - Aprobar publicación
- `PATCH /api/petposts/:id/reject` - Rechazar publicación

### Usuarios
- `POST /api/v1/users/register` - Registrar usuario
- `POST /api/v1/users/login` - Iniciar sesión
- `GET /api/v1/users` - Obtener todos los usuarios
- `GET /api/v1/users/:id` - Obtener usuario por ID

## 🧪 Scripts disponibles

- `npm run dev` - Inicia la aplicación en modo desarrollo con recarga automática
- `npm run build` - Compila el proyecto TypeScript
- `npm start` - Compila y ejecuta la aplicación para producción

## 📄 Licencia
ISC

## 👨‍💻 Autor
Carlos Quintero

---

⭐ ¡No olvides dejar una estrella si te ha sido útil! ⭐
