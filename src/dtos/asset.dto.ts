import { IsString, IsNumber, IsDate } from "class-validator";

export class CreateAssetDto {
  @IsNumber()
  public live_stream_id: string;

  @IsString()
  public stream_url: string;

  @IsString()
  public thumbnail_url: string;

  @IsDate()
  public started_streaming_at: Date;
}
