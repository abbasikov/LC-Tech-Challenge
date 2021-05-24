import { NextFunction, Request, Response } from "express";
import { CreateAssetDto } from "@/dtos/asset.dto";
import { Asset } from "@/interfaces/asset.interface";
import assetService from "@/services/assets.service";

class AssetsController {
  private assetService = new assetService();

  public getAssets = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllAssetsData: Asset[] = await this.assetService.findAllAsset();
      res.status(200).json({ data: findAllAssetsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public postAssets = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const assetData: CreateAssetDto = req.body;
      console.log();
      const postAsset: Asset = await this.assetService.createAsset(assetData);
      res.status(200).json({ data: postAsset, message: "postAsset" });
    } catch (error) {
      next(error);
    }
  };
}

export default AssetsController;
