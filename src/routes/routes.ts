import { Router } from "express";
import { CreatePersonController } from "../controllers/CreatePersonController";

const router: Router = Router();
const createPerson: CreatePersonController = new CreatePersonController();


router.post("/perosn", createPerson.handle);

export { router };