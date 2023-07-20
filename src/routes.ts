import { Router } from "express";
import { homeController } from "./controllers/HomeController";

const routes = Router();

routes.get("/", new homeController().homeFunction);

export { routes };
