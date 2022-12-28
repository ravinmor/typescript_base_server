import { Request, Response } from "express";
import { UserAccessControlListService } from "../services/UserAccessControlListService";

export class UserAccessControlListController {
  async addRolesAndPermissions(request: Request, response: Response) {
    const { permissions, roles } = request.body;
    const { userId } = request;

    const createUserACLService = new UserAccessControlListService();

    const result = await createUserACLService.addRolesAndPermissions({
      userId,
      permissions,
      roles,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }

  async addRole() {}

  async addPermissions() {}

  async addRolesAndPermissionsByUserId() {}

  async addRoleByUserId() {}
  
  async addPermissionsByUserId() {}
}
