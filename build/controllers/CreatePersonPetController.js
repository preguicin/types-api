"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePersonPetController = void 0;
const prismaClient_1 = require("../database/prismaClient");
const util_1 = require("../utils/util");
class CreatePersonPetController {
    async handle(req, res) {
        const { person, pet } = req.body;
        try {
            if ("id" in person && "id" in pet) {
                console.log(pet.id);
                const petPerson = prismaClient_1.prismaClient.personPet.create({
                    data: {
                        pet: {
                            connect: {
                                id: pet.id
                            }
                        },
                        person: {
                            connect: {
                                id: person.id
                            }
                        },
                        assignedAt: new Date()
                    },
                    include: {
                        person: true,
                        pet: true
                    }
                });
                return res.json(petPerson);
            }
            else if ("id" in person) {
                console.log("?");
                const petPerson = prismaClient_1.prismaClient.personPet.create({
                    data: {
                        pet: {
                            connect: {
                                id: pet.id
                            }
                        },
                        person: {
                            connect: {
                                id: person.id
                            }
                        }
                    },
                    include: {
                        person: true,
                        pet: true
                    }
                });
                return res.json(petPerson);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ "message": (0, util_1.getLastMessageOfError)(error.message) });
            }
            return res.status(400).json({ "message": "Unknown error" });
        }
    }
}
exports.CreatePersonPetController = CreatePersonPetController;
