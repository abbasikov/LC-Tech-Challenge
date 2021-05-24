import { IsString, IsNumber } from "class-validator";

export class CreateLocationDto {
  @IsString()
  public live_stream_key: string;

  @IsNumber()
  public live_stream_id: number;

  @IsNumber()
  public client_id: number;
}
