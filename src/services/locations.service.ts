import DB from "@databases";
import { Location } from "@/interfaces/location.interface";
import { join } from "path/posix";
import { LocationModel } from "@/models/location.model";

class LocationService {
  private locations = DB.Locations;

  public async findAllLocation(): Promise<Location[]> {
    const allLocation: Location[] = await this.locations.findAll();
    return allLocation;
  }
}

export default LocationService;
