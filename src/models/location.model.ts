import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Location } from '@/interfaces/location.interface';

export type LocationCreationAttributes = Optional<Location, 'LiveStreamID' | 'ClientID' | 'LiveStreamKey'>;

export class LocationModel extends Model<Location, LocationCreationAttributes> implements Location {
  public id: number;
  public ClientID: number;
  public LiveStreamID: number;
  public LiveStreamKey: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof LocationModel {
  LocationModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ClientID: {
        allowNull: false,
        type: DataTypes.NUMBER,
      },
      LiveStreamID: {
        allowNull: false,
        type: DataTypes.NUMBER,
      },
      LiveStreamKey:{
        allowNull:false,
        type:DataTypes.STRING(256),
      },
    },
    {
      tableName: 'locations',
      sequelize,
    },
  );

  return LocationModel;
}
