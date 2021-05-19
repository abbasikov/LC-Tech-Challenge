import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Asset } from '@/interfaces/asset.interface';

export type AssetCreationAttributes = Optional<Asset, 'StartedStreamingAt' | 'StreamURL' | 'ThumbnailURL'>;

export class AssetModel extends Model<Asset, AssetCreationAttributes> implements Asset {
  public id: number;
  public LiveStreamID: number;
  public StartedStreamingAt: Date;
  public StreamURL: string;
  public ThumbnailURL: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof AssetModel {
  AssetModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      StartedStreamingAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      LiveStreamID: {
        allowNull: false,
        type: DataTypes.NUMBER,
      },
      StreamURL:{
        allowNull:false,
        type:DataTypes.STRING(256),
      },
      ThumbnailURL:{
        allowNull:false,
        type:DataTypes.STRING(256),
      }
    },
    {
      tableName: 'assets',
      sequelize,
    },
  );

  return AssetModel;
}
