import express, { Express } from "express";
import { router } from "./routes/routes";
import * as swaggerUI from "swagger-ui-express";
import { contract } from "./contracts/contract";
import { generateOpenApi } from "@ts-rest/open-api";

const app: Express = express();

app.use(express.json());
app.use(router);

const openApiDocument = generateOpenApi(contract, {
	info:{
		title: "titulo",
		version: "1.0"
	}
});

app.use("/docs", swaggerUI.serve, swaggerUI.setup(openApiDocument));

app.listen(3000, ()=>{
	console.log("Server is running on PORT 3000");
});