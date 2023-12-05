import { Express, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import * as swaggerDoc from "../docs/definition.json";

function swaggerDocs(app:Express){
	app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

	app.get("docs.json", (req:Request, res:Response) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerDoc);
	});
}

export { swaggerDocs };