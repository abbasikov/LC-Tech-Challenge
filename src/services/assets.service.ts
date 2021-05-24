import DB from "@databases";
import { Asset } from "@/interfaces/asset.interface";
import { join } from "path/posix";
import { AssetModel } from "@/models/assets.model";
import { CreateAssetDto } from "@/dtos/asset.dto";
import { isEmpty } from "class-validator";
import HttpException from "@/exceptions/HttpException";
import { AnswerKey } from "@/interfaces/answer_key.interface";
import { LocationModel } from "@/models/location.model";

import eventService from "@/services/events.service";
import { EventModel } from "@/models/events.model";

class AssetService {
  private assets = DB.Assets;
  private answerKey = DB.AnswerKeys;
  private locations = DB.Locations;
  private eventService = new eventService();

  public async findAllAsset(): Promise<Asset[]> {
    const allAsset: Asset[] = await this.assets.findAll();
    return allAsset;
  }

  public async createAsset(assetData: CreateAssetDto): Promise<Asset> {
    if (isEmpty(assetData)) throw new HttpException(400, "Enter asset's Data");

    let Location = await this.locations.findOne({
      where: { live_stream_id: assetData.live_stream_id },
    });

    const events: any = await this.eventService.findEventsByLocation(
      Location.id
    );

    const startTime = new Date(assetData.started_streaming_at);
    //Haven't implemented Fuzzy logic here but it can be achieved through sorting
    // and adding the minutes by chechking its next and previous event's timing
    // the correct event could be picked

    // currently time within correct start and end time will match an event otherwise it will create a new event
    const event = events.filter((i) => {
      if (
        new Date(i.dataValues.start_time) < startTime &&
        new Date(i.dataValues.end_time) > startTime
      ) {
        return true;
      }
    });
    if (event.length) {
      const createAssetData: Asset = await this.assets.create({ ...assetData });

      const newAsset: any = await this.assets.findOne({
        include: [{ model: LocationModel }],
      });

      const createAnswerKey: AnswerKey = await this.answerKey.create({
        asset_id: createAssetData.id,
        client_id: newAsset.LocationModel.dataValues.client_id,
        location_id: newAsset.LocationModel.dataValues.id,
        event_id: event[0].id,
      });

      return createAssetData;
    } else {
      const createAssetData: Asset = await this.assets.create({ ...assetData });

      const newAsset: any = await this.assets.findOne({
        include: [{ model: LocationModel }],
      });

      let event = await this.eventService.postEvent({
        title: `Client # ${newAsset.LocationModel.dataValues.client_id} was Live`,
        description: "",
        location_id: Location.id,
        end_time: "",
        start_time: "",
      });

      const createAnswerKey: AnswerKey = await this.answerKey.create({
        asset_id: createAssetData.id,
        client_id: newAsset.LocationModel.dataValues.client_id,
        location_id: newAsset.LocationModel.dataValues.id,
        event_id: event.id,
      });
      return createAssetData;
    }
  }
}

export default AssetService;
