import { User, UserRole } from '../data';
import { PostgresDatabase } from '../data/postgres/postgres-database';
import { envs } from '../config';

async function createAdmin() {
  try {
    // Conectar a la base de datos
    const postgresDatabase = new PostgresDatabase({
      host: envs.POSTGRES_HOST,
      port: +envs.POSTGRES_PORT,
      username: envs.POSTGRES_USER,
      password: envs.POSTGRES_PASSWORD,
      database: envs.POSTGRES_DB,
    });
    await postgresDatabase.connect();
    
    // Crear usuario administrador
    const admin = new User();
    admin.name = 'Admin';
    admin.email = 'admin@example.com';
    admin.password = 'admin1234'; // Se hasheará automáticamente
    admin.role = UserRole.ADMIN;
    admin.isEmailVerified = true; // Administrador ya verificado
    
    await admin.save();
    
    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdmin();