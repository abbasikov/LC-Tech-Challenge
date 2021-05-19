import { Router } from 'express';
import EventsController from '@controllers/events.controller';
import { CreateEventDto } from '@/dtos/events.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class EventsRoute implements Route {
  public path = '/events';
  public router = Router();
  public eventsController = new EventsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.eventsController.getEvents);
  }
}

export default EventsRoute;
