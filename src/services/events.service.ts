
import DB from '@databases';
import { Event } from '@/interfaces/event.interface';

class EventService {
  public events = DB.Events;

  public async findAllEvent(): Promise<Event[]> {
    const allEvent: Event[] = await this.events.findAll(
      {attributes:['Title','Description','StartTime','EndTime','LocationID']}
      );
    return allEvent;
  }
}

export default EventService;
