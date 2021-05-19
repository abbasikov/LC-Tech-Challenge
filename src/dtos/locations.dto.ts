import { IsString, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsString()
  public LiveStreamKey: string;

  @IsNumber()
  public LiveStreamID: number;

  @IsNumber()
  public ClientID: number;
}
