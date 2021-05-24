import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { Event } from "@/interfaces/event.interface";
import { LocationModel } from "./location.model";
import { ClientModel } from "./clients.model";

export type EventCreationAttributes = Optional<
  Event,
  "start_time" | "end_time" | "location_id" | "description" | "title" | "id"
>;

export class EventModel
  extends Model<Event, EventCreationAttributes>
  implements Event
{
  public id: number;
  public description: string;
  public start_time: string;
  public end_time: string;
  public location_id: number;
  public title: string;
}

export default function (sequelize: Sequelize): typeof EventModel {
  EventModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      start_time: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      end_time: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      title: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      location_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "events",
      sequelize,
      createdAt: false,
      updatedAt: false,
    }
  );

  EventModel.belongsTo(LocationModel, {
    foreignKey: "location_id",
  });

  return EventModel;
}
