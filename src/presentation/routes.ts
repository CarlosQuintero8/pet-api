import { Request, Response, Router } from "express";
import { PetRoutes } from "./pets/routes";
import { UserRoutes } from "./user/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/petposts", PetRoutes.routes);
    router.use("/api/v1/users", UserRoutes.routes);
    //router.use("/api/v1/doctors");

    return router;
  }
}
