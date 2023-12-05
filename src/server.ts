import express, { Express } from "express";
import { router } from "./routes/routes";
import { swaggerDocs } from "./utils/swagger";

const app: Express = express();

app.use(express.json());
app.use(router);

app.listen(3000, ()=>{
	swaggerDocs(app);
	console.log("Server is running on PORT 3000");
});


