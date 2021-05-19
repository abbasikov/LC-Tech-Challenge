import { Router } from 'express';
import ClientsController from '@controllers/users.controller';
import { CreateClientDto } from '@/dtos/clients.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ClientsRoute implements Route {
  public path = '/users';
  public router = Router();
  public usersController = new ClientsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getClients);
    this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getClientById);
    this.router.post(`${this.path}`, validationMiddleware(CreateClientDto, 'body',true), this.usersController.createClient);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateClientDto, 'body', true), this.usersController.updateClient);
    this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteClient);
  }
}

export default ClientsRoute;
