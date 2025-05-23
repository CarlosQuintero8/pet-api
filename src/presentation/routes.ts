import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { PetPostRoutes } from './pets/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    
    // Rutas de usuarios
    router.use('/api/v1/users', UserRoutes.routes);
    
    // Rutas de mascotas
    router.use('/api/v1/pets', PetPostRoutes.routes);
    
    return router;
  }
}