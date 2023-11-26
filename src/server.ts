import express, { Express } from "express";
import { router } from "./routes/routes";

const app: Express = express();

app.use(express.json());
app.use(router);

app.listen(3000, ()=>{console.log("Server is running on PORT 3000");});