import { Router } from "express";
import AssetsController from "@controllers/assets.controller";

import Route from "@interfaces/routes.interface";
import authMiddleware from "@/middlewares/auth.middleware";

class AssetsRoute implements Route {
  public path = "/assets";
  public router = Router();
  public assetsController = new AssetsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      authMiddleware,
      this.assetsController.postAssets
    );
  }
}

export default AssetsRoute;
