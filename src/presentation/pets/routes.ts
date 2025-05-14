import { Request, Response, Router } from "express";
import { PetController } from "./controller";
import { CreatorPetService } from "./services/create-pet.service";
import { FinderPetService } from "./services/finder-pet.service";
import { DeletePetService } from "./services/delete-pet.service";
import { UpdatePetService } from "./services/update-pet.service";
import { ApprovePetPostService } from "./services/approved-pet.service";
import { RejectPetPostService } from "./services/rejected-pet.service";

export class PetRoutes {
  static get routes(): Router {
    const router = Router();

    const createPetService = new CreatorPetService();
    const finderPetService = new FinderPetService();
    const deletePetService = new DeletePetService(finderPetService);
    const updatePetService = new UpdatePetService(finderPetService);
    const approvePetPostService = new ApprovePetPostService(finderPetService);
    const rejectPetPostService = new RejectPetPostService(finderPetService);
    
    const controller = new PetController(
      createPetService,
      finderPetService,
      deletePetService,
      updatePetService,
      approvePetPostService,
      rejectPetPostService
    );

    // Rutas básicas CRUD
    router.get("/", controller.findAllPets);
    router.post("/", controller.createPet);
    router.get("/:id", controller.findOne);
    router.patch("/:id", controller.update);
    router.delete("/:id", controller.delete);
    
    // Rutas para aprobar/rechazar publicaciones
    router.patch("/:id/approve", controller.approve);
    router.patch("/:id/reject", controller.reject);

    return router;
  }
}
