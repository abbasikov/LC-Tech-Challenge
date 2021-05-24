import { Router } from "express";
import ClientsController from "@/controllers/clients.controller";
import { CreateClientDto } from "@/dtos/clients.dto";
import Route from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";
import authMiddleware from "@/middlewares/auth.middleware";

class ClientsRoute implements Route {
  public path = "/clients";
  public router = Router();
  public usersController = new ClientsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getClients);
    this.router.get(
      `${this.path}/:id(\\d+)`,
      this.usersController.getClientById
    );
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateClientDto, "body", true),
      this.usersController.createClient
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(CreateClientDto, "body", true),
      this.usersController.updateClient
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`,
      this.usersController.deleteClient
    );
    this.router.get(
      `${this.path}/:client_id(\\d+)/asset/:asset_id(\\d+)`,
      authMiddleware,
      this.usersController.getAssetClientById
    );
    this.router.get(
      `${this.path}/:client_id(\\d+)/assets`,
      authMiddleware,
      this.usersController.getAssetsByClientId
    );
    this.router.get(
      `${this.path}/:client_id(\\d+)/assets/:start_time/:end_time`,
      authMiddleware,
      this.usersController.getAssetsByClientIdAndTime
    );
  }
}

export default ClientsRoute;
