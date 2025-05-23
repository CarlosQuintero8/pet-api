import { Request, Response, Router } from "express";
import { PetPostController } from './controller';
import { CreatorPetService } from "./services/create-pet.service";
import { FinderPetService } from "./services/finder-pet.service";
import { DeletePetService } from "./services/delete-pet.service";
import { UpdatePetService } from "./services/update-pet.service";
import { ApprovePetPostService } from "./services/approved-pet.service";
import { RejectPetPostService } from "./services/rejected-pet.service";
import { authMiddleware } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/admin.middleware';

export class PetRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new PetPostController();

    // Rutas para usuarios normales (sin restricciones)
    router.get("/", controller.findAllPets);
    router.get("/:id", controller.findOne);
    
    // Rutas que requieren autenticación
    router.post("/", [authMiddleware], controller.createPet);
    
    // Rutas que requieren ser administrador
    router.patch("/:id", [authMiddleware, adminMiddleware], controller.update);
    router.delete("/:id", [authMiddleware, adminMiddleware], controller.delete);
    router.patch("/:id/approve", [authMiddleware, adminMiddleware], controller.approvePost);
    router.patch("/:id/reject", [authMiddleware, adminMiddleware], controller.rejectPost);

    return router;
  }
}
export class PetPostRoutes {
  static get routes(): Router {
    const router = Router();

    const createPetService = new CreatorPetService();
    const finderPetService = new FinderPetService();
    const deletePetService = new DeletePetService(finderPetService);
    const updatePetService = new UpdatePetService(finderPetService);
    const approvePetPostService = new ApprovePetPostService(finderPetService);
    const rejectPetPostService = new RejectPetPostService(finderPetService);

    const controller = new PetPostController();

    // Rutas para usuarios normales (sin restricciones)
    router.get("/", controller.findAllPets);
    router.get("/:id", controller.findOne);
    
    // Rutas que requieren autenticación
    router.post("/", [authMiddleware], controller.createPet);
    
    // Rutas para administradores
    router.patch("/:id", [authMiddleware, adminMiddleware], controller.update);
    router.delete("/:id", [authMiddleware, adminMiddleware], controller.delete);
    router.patch('/:id/approve', [authMiddleware, adminMiddleware], controller.approvePost);
    router.patch('/:id/reject', [authMiddleware, adminMiddleware], controller.rejectPost);

    return router;
  }
}