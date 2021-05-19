import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import DB from '@databases';
import { CreateClientDto } from '@/dtos/clients.dto';
import HttpException from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Client } from '@/interfaces/client.interface';
import { isEmpty } from '@utils/util';

class AuthService {
  public clients = DB.Clients;

  public async signup(clientData: CreateClientDto): Promise<Client> {
    if (isEmpty(clientData)) throw new HttpException(400, "You're not clientData");

    const findClient: Client = await this.clients.findOne({ where: { email: clientData.email } });
    if (findClient) throw new HttpException(409, `You're email ${clientData.email} already exists`);

    const hashedPassword = await bcrypt.hash(clientData.password, 10);
    const createClientData: Client = await this.clients.create({ ...clientData, password: hashedPassword });

    return createClientData;
  }

  public async login(clientData: CreateClientDto): Promise<{ cookie: string; findClient: Client }> {
    if (isEmpty(clientData)) throw new HttpException(400, "You're not clientData");

    const findClient: Client = await this.clients.findOne({ where: { email: clientData.email } });
    if (!findClient) throw new HttpException(409, `You're email ${clientData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(clientData.password, findClient.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findClient);
    const cookie = this.createCookie(tokenData);

    return { cookie, findClient };
  }

  public async logout(clientData: Client): Promise<Client> {
    if (isEmpty(clientData)) throw new HttpException(400, "You're not clientData");

    const findClient: Client = await this.clients.findOne({ where: { email: clientData.email, password: clientData.password } });
    if (!findClient) throw new HttpException(409, "You're not client");

    return findClient;
  }

  public createToken(client: Client): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: client.id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
