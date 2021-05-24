import bcrypt from "bcrypt";
import DB from "@databases";
import { CreateClientDto } from "@/dtos/clients.dto";
import HttpException from "@exceptions/HttpException";
import { Client } from "@/interfaces/client.interface";
import { isEmpty } from "@utils/util";
import { AnswerKey } from "@/interfaces/answer_key.interface";
import { EventModel } from "@/models/events.model";
import { AssetModel } from "@/models/assets.model";
import { Op } from "sequelize";

class ClientService {
  private clients = DB.Clients;
  private answer_key = DB.AnswerKeys;

  public async findAllClient(): Promise<Client[]> {
    const allClient: Client[] = await this.clients.findAll({
      attributes: ["id", "email", "createdAt", "updatedAt"],
    });
    return allClient;
  }

  public async findClientById(clientId: number): Promise<Client> {
    if (isEmpty(clientId)) throw new HttpException(400, "You're not clientId");

    const findClient: Client = await this.clients.findByPk(clientId);
    if (!findClient) throw new HttpException(409, "You're not client");

    return findClient;
  }

  public async createClient(clientData: CreateClientDto): Promise<Client> {
    if (isEmpty(clientData))
      throw new HttpException(400, "Enter client's Data");

    const findClient: Client = await this.clients.findOne({
      where: { email: clientData.email },
    });
    if (findClient)
      throw new HttpException(
        409,
        `Your email ${clientData.email} already exists`
      );

    const hashedPassword = await bcrypt.hash(clientData.password, 10);
    const createClientData: Client = await this.clients.create({
      ...clientData,
      password: hashedPassword,
    });
    return createClientData;
  }

  public async updateClient(
    clientId: number,
    clientData: CreateClientDto
  ): Promise<Client> {
    if (isEmpty(clientData))
      throw new HttpException(400, "You're not clientData");

    const findClient: Client = await this.clients.findByPk(clientId);
    if (!findClient) throw new HttpException(409, "You're not client");

    const hashedPassword = await bcrypt.hash(clientData.password, 10);
    await this.clients.update(
      { ...clientData, password: hashedPassword },
      { where: { id: clientId } }
    );

    const updateClient: Client = await this.clients.findByPk(clientId);
    return updateClient;
  }

  public async deleteClient(clientId: number): Promise<Client> {
    if (isEmpty(clientId)) throw new HttpException(400, "You're not clientId");

    const findClient: Client = await this.clients.findByPk(clientId);
    if (!findClient) throw new HttpException(409, "You're not client");

    await this.clients.destroy({ where: { id: clientId } });

    return findClient;
  }

  public async clientAssetInfo(
    clientId: number,
    assetId: number
  ): Promise<AnswerKey> {
    if (isEmpty(clientId) || isEmpty(assetId))
      throw new HttpException(400, "Client ID or Asset ID is missing");

    const findClientAsset: AnswerKey = await this.answer_key.findOne({
      where: { client_id: clientId, asset_id: assetId },
      include: [
        {
          model: EventModel,
          attributes: ["title", "description", "start_time", "end_time"],
        },
        {
          model: AssetModel,
          attributes: ["stream_url", "thumbnail_url", "started_streaming_at"],
        },
      ],
    });
    if (!findClientAsset) throw new HttpException(409, "No record found");

    return findClientAsset;
  }

  public async clientAssetsInfo(clientId: number): Promise<AnswerKey[]> {
    if (isEmpty(clientId)) throw new HttpException(400, "Client ID is missing");

    const findClientAsset: AnswerKey[] = await this.answer_key.findAll({
      where: { client_id: clientId },
      include: [
        {
          model: EventModel,
          attributes: ["title", "description", "start_time", "end_time"],
        },
        {
          model: AssetModel,
          attributes: ["stream_url", "thumbnail_url", "started_streaming_at"],
        },
      ],
    });
    if (!findClientAsset) throw new HttpException(409, "No record found");

    return findClientAsset;
  }

  public async clientAssetsInfoByTime(
    clientId: number,
    startTime: Date,
    endTime: Date
  ): Promise<AnswerKey[]> {
    if (isEmpty(clientId)) throw new HttpException(400, "Client ID is missing");
    console.log(startTime, endTime);
    let findClientAsset: any[] = await this.answer_key.findAll({
      where: { client_id: clientId },
      include: [
        {
          model: EventModel,
          attributes: ["title", "description", "start_time", "end_time"],
        },
        {
          model: AssetModel,
          attributes: ["stream_url", "thumbnail_url", "started_streaming_at"],
          // where: {
          //   started_streaming_at: {
          //     [Op.gt]: startTime,
          //     [Op.lt]: endTime,
          //   },
          //   $between: [startTime, endTime],
          // },
          // },
        },
      ],
    });

    findClientAsset = findClientAsset.filter((i) => {
      // console.log(i.AssetModel.dataValues);
      if (
        new Date(i.AssetModel.dataValues.started_streaming_at) > startTime &&
        new Date(i.AssetModel.dataValues.started_streaming_at) < endTime
      ) {
        return true;
      }
    });
    if (!findClientAsset) throw new HttpException(409, "No record found");

    return findClientAsset;
  }
}

export default ClientService;
