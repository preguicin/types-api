"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
const swagger_1 = require("./utils/swagger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.router);
app.listen(3000, () => {
    (0, swagger_1.swaggerDocs)(app);
    console.log("Server is running on PORT 3000");
});
