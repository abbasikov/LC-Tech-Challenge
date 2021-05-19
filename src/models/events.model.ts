import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Event } from '@/interfaces/event.interface';
import { LocationModel } from './location.model';

export type EventCreationAttributes = Optional<Event, 'StartTime' | 'EndTime' | 'LocationID' | 'Description' | 'Title'>;

export class EventModel extends Model<Event, EventCreationAttributes> implements Event {
  public ID: number;
  public Description: string;
  public StartTime: Date;
  public EndTime: Date;
  public LocationID: number;
  public Title: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof EventModel {
  EventModel.init(
    {
      ID: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      StartTime: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      EndTime: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      Description:{
        allowNull:false,
        type:DataTypes.TEXT,
      },
      Title:{
        allowNull:false,
        type:DataTypes.TEXT,
      },
      LocationID:{
        allowNull:false,
        type:DataTypes.INTEGER
      }
    },
    {
      tableName: 'events',
      sequelize,
    },
  );

  return EventModel;
}
