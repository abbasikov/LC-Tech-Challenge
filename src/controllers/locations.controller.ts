import { NextFunction, Request, Response } from "express";
import { CreateLocationDto } from "@/dtos/locations.dto";
import { Location } from "@/interfaces/location.interface";
import locationService from "@/services/locations.service";

class LocationsController {
  private locationService = new locationService();

  public getLocations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllLocationsData: Location[] =
        await this.locationService.findAllLocation();

      res.status(200).json({ data: findAllLocationsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };
}

export default LocationsController;
