import express from "express";
import { routes } from "./routes";
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.use(routes);

app.listen(port, () => console.log(`> Server is running on port: ${port}`));
