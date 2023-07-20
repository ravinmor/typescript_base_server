import { Request, Response } from "express";
import { HomeService } from "../services/HomeService";

export class homeController {
  async homeFunction(request: Request, response: Response) {

    const service = new HomeService();
    const result = await service.homeFunction();

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.json(result);
  }
}
