import { Router } from "express";
import { CreatePersonController } from "../controllers/CreatePersonController";
import { CreatePetController } from "../controllers/CreatePetController";
import { CreatePersonPetController } from "../controllers/CreatePersonPetController";

const router: Router = Router();
const createPet: CreatePetController = new CreatePetController();
const createPerson: CreatePersonController = new CreatePersonController();
const createPersonPet: CreatePersonPetController = new CreatePersonPetController();

router.post("/person", createPerson.handle);
router.post("/pet", createPet.handle);
router.post("/personpet", createPersonPet.handle);

export { router };