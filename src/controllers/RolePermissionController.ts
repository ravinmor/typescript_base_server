import { Request, Response } from "express";
import { RolePermissionService } from "../services/RolePermissionService";

export class RolePermissionController {
  async getRoleById(request: Request, response: Response) {
    const { roleId } = request.params;
    const { permissions } = request.body;

    const rolePermissionService = new RolePermissionService();

    const result = await rolePermissionService.getRoleById({
      roleId,
      permissions,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
