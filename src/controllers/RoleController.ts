import { Request, Response } from "express";
import { RoleService } from "../services/RoleService";

export class RoleController {
  async createRole(request: Request, response: Response) {
    const { name, description } = request.body;

    const roleService = new RoleService();

    const result = await roleService.createRole({ name, description });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
