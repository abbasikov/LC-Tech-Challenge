import { NextFunction, Request, Response } from "express";
import { CreateClientDto } from "@/dtos/clients.dto";
import { Client } from "@/interfaces/client.interface";
import userService from "@/services/clients.service";
import { AnswerKey } from "@/interfaces/answer_key.interface";

class ClientsController {
  private userService = new userService();

  public getClients = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllClientsData: Client[] =
        await this.userService.findAllClient();

      res.status(200).json({ data: findAllClientsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getClientById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = Number(req.params.id);
      const findOneClientData: Client = await this.userService.findClientById(
        userId
      );

      res.status(200).json({ data: findOneClientData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createClient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: CreateClientDto = req.body;
      const createClientData: Client = await this.userService.createClient(
        userData
      );

      res.status(201).json({ data: createClientData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateClient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = Number(req.params.id);
      const userData: CreateClientDto = req.body;
      const updateClientData: Client = await this.userService.updateClient(
        userId,
        userData
      );

      res.status(200).json({ data: updateClientData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteClient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = Number(req.params.id);
      const deleteClientData: Client = await this.userService.deleteClient(
        userId
      );

      res.status(200).json({ data: deleteClientData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };

  public getAssetClientById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = Number(req.params.client_id);
      const assetId = Number(req.params.asset_id);
      const findOneClientData: AnswerKey =
        await this.userService.clientAssetInfo(userId, assetId);

      res.status(200).json({ data: findOneClientData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public getAssetsByClientId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = Number(req.params.client_id);
      const findClientData: any = await this.userService.clientAssetsInfo(
        userId
      );

      res
        .status(200)
        .json({ data: findClientData, message: "findClientsAssets" });
    } catch (error) {
      next(error);
    }
  };

  public getAssetsByClientIdAndTime = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = Number(req.params.client_id);
      const startTime = new Date(req.params.start_time);
      const endTime = new Date(req.params.end_time);

      const findClientData: any = await this.userService.clientAssetsInfoByTime(
        userId,
        startTime,
        endTime
      );

      res
        .status(200)
        .json({ data: findClientData, message: "findClientsAssets" });
    } catch (error) {
      next(error);
    }
  };
}

export default ClientsController;
