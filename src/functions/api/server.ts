import express from "express";
import serverless from "serverless-http";
import { router } from "./routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

const handler = serverless(app);

console.log("hello");

export { handler };
