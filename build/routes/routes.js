"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreatePersonController_1 = require("../controllers/CreatePersonController");
const router = (0, express_1.Router)();
exports.router = router;
const createPerson = new CreatePersonController_1.CreatePersonController();
router.post("/perosn", createPerson.handle);
