import { Router } from "express";
import LocationsController from "@controllers/locations.controller";

import Route from "@interfaces/routes.interface";

class LocationsRoute implements Route {
  public path = "/locations";
  public router = Router();
  public locationsController = new LocationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.locationsController.getLocations);
  }
}

export default LocationsRoute;
