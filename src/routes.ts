import { Router } from "express";
import { PermissionController } from "./controllers/PermissionController";
import { RoleController } from "./controllers/RoleController";
import { RolePermissionController } from "./controllers/RolePermissionController";
import { UserAccessControlListController } from "./controllers/UserAccessControlListController";
import { UserController } from "./controllers/UserController";
import { SessionController } from "./controllers/SessionController";
import { ensuredAuthenticated } from "./middleware/ensuredAuthenticated";
import { can, is } from "./middleware/permissions";

const routes = Router();

routes.get("/user/:id", ensuredAuthenticated(), new UserController().index);
routes.get("/getUserByEmail", ensuredAuthenticated(),  new UserController().getUserByEmail);
routes.post("/createUser", ensuredAuthenticated(),  new UserController().createUser);
routes.put("/updateUser/:id", ensuredAuthenticated(),  new UserController().updateUser);
routes.delete("/deleteUser/:id", ensuredAuthenticated(),  new UserController().deleteUser);

routes.post("/login", new SessionController().handle);

routes.post(
  "/roles",
  ensuredAuthenticated(),
  new RoleController().createRole
);

routes.post(
  "/permissions",
  ensuredAuthenticated(),
  new PermissionController().createPermission
);

routes.post(
  "/users/acl",
  ensuredAuthenticated(),
  new UserAccessControlListController().addRolesAndPermissions
);

routes.post("/roles/:roleId", new RolePermissionController().getRoleById);

export { routes };
