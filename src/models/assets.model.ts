import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { Asset } from "@/interfaces/asset.interface";
import { EventModel } from "./events.model";
import { LocationModel } from "./location.model";

export type AssetCreationAttributes = Optional<
  Asset,
  | "started_streaming_at"
  | "stream_url"
  | "thumbnail_url"
  | "live_stream_id"
  | "id"
>;

export class AssetModel
  extends Model<Asset, AssetCreationAttributes>
  implements Asset
{
  public id: number;
  public live_stream_id: string;
  public started_streaming_at: Date;
  public stream_url: string;
  public thumbnail_url: string;
}

export default function (sequelize: Sequelize): typeof AssetModel {
  AssetModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      started_streaming_at: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      live_stream_id: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      stream_url: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      thumbnail_url: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "assets",
      sequelize,
      createdAt: false,
      updatedAt: false,
    }
  );
  AssetModel.belongsTo(LocationModel, {
    foreignKey: "live_stream_id",
    targetKey: "live_stream_id",
  });

  return AssetModel;
}
