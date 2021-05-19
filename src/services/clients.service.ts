import bcrypt from 'bcrypt';
import DB from '@databases';
import { CreateClientDto } from '@/dtos/clients.dto';
import HttpException from '@exceptions/HttpException';
import { Client } from '@/interfaces/client.interface';
import { isEmpty } from '@utils/util';

class ClientService {
  public clients = DB.Clients;

  public async findAllClient(): Promise<Client[]> {
    const allClient: Client[] = await this.clients.findAll();
    return allClient;
  }

  public async findClientById(clientId: number): Promise<Client> {
    if (isEmpty(clientId)) throw new HttpException(400, "You're not clientId");

    const findClient: Client = await this.clients.findByPk(clientId);
    if (!findClient) throw new HttpException(409, "You're not client");

    return findClient;
  }

  public async createClient(clientData: CreateClientDto): Promise<Client> {
    if (isEmpty(clientData)) throw new HttpException(400, "You're not clientData");

    const findClient: Client = await this.clients.findOne({ where: { email: clientData.email } });
    if (findClient) throw new HttpException(409, `You're email ${clientData.email} already exists`);

    const hashedPassword = await bcrypt.hash(clientData.password, 10);
    const createClientData: Client = await this.clients.create({ ...clientData, password: hashedPassword });
    return createClientData;
  }

  public async updateClient(clientId: number, clientData: CreateClientDto): Promise<Client> {
    if (isEmpty(clientData)) throw new HttpException(400, "You're not clientData");

    const findClient: Client = await this.clients.findByPk(clientId);
    if (!findClient) throw new HttpException(409, "You're not client");

    const hashedPassword = await bcrypt.hash(clientData.password, 10);
    await this.clients.update({ ...clientData, password: hashedPassword }, { where: { id: clientId } });

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
}

export default ClientService;
