import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Client } from '@/interfaces/client.interface';

export type ClientCreationAttributes = Optional<Client, 'id' | 'email' | 'password'>;

export class ClientModel extends Model<Client, ClientCreationAttributes> implements Client {
  public id: number;
  public email: string;
  public password: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ClientModel {
  ClientModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'clients',
      sequelize,
    },
  );

  return ClientModel;
}
