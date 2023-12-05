import { Router } from "express";
import { CreatePersonController } from "../controllers/create/CreatePersonController";
import { CreatePetController } from "../controllers/create/CreatePetController";
import { CreatePersonPetController } from "../controllers/create/CreatePersonPetController";
import { GetPersonController } from "../controllers/get/GetPersonController";
import { GetPetController } from "../controllers/get/GetPetController";
import { GetPersonPetController } from "../controllers/get/GetPersonPetController";
import { CreateContactsController } from "../controllers/create/CreateContactsController";
import { GetContactsController } from "../controllers/get/GetContactsController";
import { DeletePersonController } from "../controllers/delete/DeletePersonController";
import { DeleteContactsController } from "../controllers/delete/DeleteContactsController";
import { DeletePetController } from "../controllers/delete/DeletePetController";
import { DeletePersonPetController } from "../controllers/delete/DeletePersonPetController";
import { PutPersonController } from "../controllers/put/PutPersonController";
import { PutPetController } from "../controllers/put/PutPetController";
import { PutPersonPetController } from "../controllers/put/PutPersonPetController";
import { PutContactsController } from "../controllers/put/PutContactsController";

const router: Router = Router();

//Create
const createPet: CreatePetController = new CreatePetController();
const createPerson: CreatePersonController = new CreatePersonController();
const createPersonPet: CreatePersonPetController = new CreatePersonPetController();
const createContacts: CreateContactsController = new CreateContactsController();

//Get
const getPerson: GetPersonController = new GetPersonController();
const getPet: GetPetController = new GetPetController();
const getPersonPet: GetPersonPetController = new GetPersonPetController();
const getContacts: GetContactsController = new GetContactsController();

//Delete
const deletePerson: DeletePersonController = new DeletePersonController();
const deletePet: DeletePetController = new DeletePetController();
const deletePersonPet: DeletePersonPetController = new DeletePersonPetController();
const deleteContacts: DeleteContactsController = new DeleteContactsController();

//Put
const putPerson: PutPersonController = new PutPersonController();
const putPet: PutPetController = new PutPetController();
const putPersonPet: PutPersonPetController = new PutPersonPetController();
const putContacts: PutContactsController = new PutContactsController();


router.post("/person", createPerson.handle);
router.post("/pet", createPet.handle);
router.post("/personpet", createPersonPet.handle);
router.post("/contacts", createContacts.handle);

router.get("/person/:id", getPerson.handle);
router.get("/pet/:id", getPet.handle);
router.get("/personpet/:idPet/:idPerson", getPersonPet.handle);
router.get("/contacts/:id", getContacts.handle);

router.delete("/person/:id", deletePerson.handle);
router.delete("/pet/:id", deletePet.handle);
router.delete("/personpet/:idPet/:idPerson", deletePersonPet.handle);
router.delete("/contacts/:id", deleteContacts.handle);

router.put("/person/:id", putPerson.handle);
router.put("/pet/:id", putPet.handle);
router.put("/personpet/:idPet/:idPerson", putPersonPet.handle);
router.put("/contacts/:idPerson", putContacts.handle);

export { router };