import { Request } from 'express';
import { Client } from '@/interfaces/client.interface';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithClient extends Request {
  client: Client;
}
