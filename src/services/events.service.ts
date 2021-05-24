import DB from "@databases";
import { Event } from "@/interfaces/event.interface";
import { join } from "path/posix";
import { LocationModel } from "@/models/location.model";
import { isEmpty } from "@/utils/util";
import HttpException from "@/exceptions/HttpException";
import { CreateEventDto } from "@/dtos/events.dto";

class EventService {
  public events = DB.Events;

  public async findAllEvent(): Promise<Event[]> {
    const allEvent: Event[] = await this.events.findAll({
      // attributes: [
      //   "Title",
      //   "Description",
      //   "StartTime",
      //   "EndTime",
      //   "LocationID",
      // ],
      include: [{ model: LocationModel }],
    });
    return allEvent;
  }

  public async findEventsByLocation(LocationID): Promise<Event[]> {
    const allEvent: Event[] = await this.events.findAll({
      where: { location_id: LocationID },
    });
    return allEvent;
  }

  public async postEvent(eventData: CreateEventDto): Promise<Event> {
    if (isEmpty(eventData))
      throw new HttpException(400, "You're not eventData");

    const createEventData: Event = await this.events.create({
      ...eventData,
    });

    return createEventData;
  }
}

export default EventService;
