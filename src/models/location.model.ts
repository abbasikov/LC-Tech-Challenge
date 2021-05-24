import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { Location } from "@/interfaces/location.interface";
import { ClientModel } from "./clients.model";
import { EventModel } from "./events.model";

export type LocationCreationAttributes = Optional<
  Location,
  "id" | "live_stream_id" | "client_id" | "live_stream_key"
>;

export class LocationModel
  extends Model<Location, LocationCreationAttributes>
  implements Location
{
  public id: number;
  public client_id: number;
  public live_stream_id: number;
  public live_stream_key: string;
}

export default function (sequelize: Sequelize): typeof LocationModel {
  LocationModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      client_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      live_stream_id: {
        allowNull: true,
        type: DataTypes.TEXT,
        unique: true,
      },
      live_stream_key: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "locations",
      sequelize,
      createdAt: false,
      updatedAt: false,
    }
  );

  LocationModel.belongsTo(ClientModel, { foreignKey: "client_id" });
  return LocationModel;
}
