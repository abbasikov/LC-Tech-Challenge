import { NextFunction, Request, Response } from "express";
import { CreateClientDto } from "@/dtos/clients.dto";
import { Client } from "@/interfaces/client.interface";
import { RequestWithClient } from "@interfaces/auth.interface";
import AuthService from "@services/auth.service";

class AuthController {
  private authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateClientDto = req.body;
      const signUpClientData: Client = await this.authService.signup(userData);

      res.status(201).json({ data: signUpClientData, message: "signup" });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateClientDto = req.body;
      const { cookie, findClient } = await this.authService.login(userData);

      res.setHeader("Set-Cookie", [cookie]);
      res.status(200).json({ data: findClient, message: "login" });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (
    req: RequestWithClient,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: Client = req.client;
      const logOutClientData: Client = await this.authService.logout(userData);

      res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
      res.status(200).json({ data: logOutClientData, message: "logout" });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
