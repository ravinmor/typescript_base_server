import { Request, Response } from "express";
import { PermissionService } from "../services/PermissionService";

export class PermissionController {
  async createPermission(request: Request, response: Response) {
    const { name, description } = request.body;

    const permissionService = new PermissionService();

    const result = await permissionService.createPermission({ name, description });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
