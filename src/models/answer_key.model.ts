import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { AnswerKey } from "@/interfaces/answer_key.interface";
import { ClientModel } from "./clients.model";
import { EventModel } from "./events.model";
import { AssetModel } from "./assets.model";
import { LocationModel } from "./location.model";

export type AnswerKeyCreationAttributes = Optional<
  AnswerKey,
  "asset_id" | "event_id" | "client_id" | "location_id"
>;

export class AnswerKeyModel
  extends Model<AnswerKey, AnswerKeyCreationAttributes>
  implements AnswerKey
{
  public asset_id: number;
  public client_id: number;
  public location_id: number;
  public event_id: number;
}

export default function (sequelize: Sequelize): typeof AnswerKeyModel {
  AnswerKeyModel.init(
    {
      asset_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      client_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      location_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      event_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "answer_key",
      sequelize,
      createdAt: false,
      updatedAt: false,
    }
  );
  AnswerKeyModel.removeAttribute("id");
  AnswerKeyModel.belongsTo(ClientModel, { foreignKey: "client_id" });
  AnswerKeyModel.belongsTo(AssetModel, { foreignKey: "asset_id" });
  AnswerKeyModel.belongsTo(EventModel, { foreignKey: "event_id" });
  AnswerKeyModel.belongsTo(LocationModel, { foreignKey: "location_id" });

  return AnswerKeyModel;
}
