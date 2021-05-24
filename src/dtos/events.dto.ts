import { IsString, IsNumber, IsDate } from "class-validator";

export class CreateEventDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsNumber()
  public location_id: number;

  @IsDate()
  public start_time: string;

  @IsDate()
  public end_time: string;
}
