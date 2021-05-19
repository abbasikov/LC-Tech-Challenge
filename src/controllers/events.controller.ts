import { NextFunction, Request, Response } from 'express';
import { CreateEventDto } from '@/dtos/events.dto';
import { Event } from '@/interfaces/event.interface';
import eventService from '@/services/events.service';

class EventsController {
  public eventService = new eventService();

  public getEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllEventsData: Event[] = await this.eventService.findAllEvent();

      res.status(200).json({ data: findAllEventsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

//   public getEventById = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const eventId = Number(req.params.id);
//       const findOneEventData: Event = await this.eventService.findEventById(eventId);

//       res.status(200).json({ data: findOneEventData, message: 'findOne' });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public createEvent = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const eventData: CreateEventDto = req.body;
//       const createEventData: Event = await this.eventService.createEvent(eventData);

//       res.status(201).json({ data: createEventData, message: 'created' });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public updateEvent = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const eventId = Number(req.params.id);
//       const eventData: CreateEventDto = req.body;
//       const updateEventData: Event = await this.eventService.updateEvent(eventId, eventData);

//       res.status(200).json({ data: updateEventData, message: 'updated' });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const eventId = Number(req.params.id);
//       const deleteEventData: Event = await this.eventService.deleteEvent(eventId);

//       res.status(200).json({ data: deleteEventData, message: 'deleted' });
//     } catch (error) {
//       next(error);
//     }
//   };
}

export default EventsController;
