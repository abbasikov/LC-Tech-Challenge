import { IsString, IsEmail } from 'class-validator';

export class CreateClientDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
