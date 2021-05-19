import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateAssetDto {
  @IsNumber()
  public LiveStreamID: string;

  @IsString()
  public StreamURL: string;

  @IsString()
  public ThumbnailURL: string;

  @IsDate()
  public StartedStreamingAt: Date;

}
