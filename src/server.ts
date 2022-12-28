import "reflect-metadata";
import express from "express";
import { routes } from "./routes";

import "./database";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(routes);

app.listen(port, () => console.log(`> Server is running on port: ${port}`));
