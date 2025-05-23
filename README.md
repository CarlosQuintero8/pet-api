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

## 👨‍💻 Autor
Carlos Quintero

---

⭐ ¡No olvides dejar una estrella si te ha sido útil! ⭐
