import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateEventDto {
  @IsString()
  public Title: string;

  @IsString()
  public Description: string;

  @IsNumber()
  public LocationID: number;

  @IsDate()
  public StartTime: Date;

  @IsDate()
  public EndTime: Date;

}
