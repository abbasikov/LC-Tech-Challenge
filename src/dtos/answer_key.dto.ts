import { IsNumber } from "class-validator";

export class AnswerKeyDTO {
  @IsNumber()
  public client_id: number;

  @IsNumber()
  public location_id: number;

  @IsNumber()
  public asset_id: number;

  @IsNumber()
  public event_id: number;
}
