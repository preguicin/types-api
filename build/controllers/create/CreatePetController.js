"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePetController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const util_1 = require("../../utils/util");
class CreatePetController {
    async handle(req, res) {
        const { name, person } = req.body;
        //creating with one pet
        try {
            if (person !== undefined) {
                if ("id" in person) {
                    const pet = await prismaClient_1.prismaClient.pet.create({
                        data: {
                            name: name,
                            persons: {
                                create: {
                                    person: {
                                        connect: {
                                            id: person.id
                                        }
                                    }
                                }
                            }
                        },
                        include: {
                            persons: true
                        }
                    });
                    return res.status(201).json(pet);
                }
                const pet = await prismaClient_1.prismaClient.pet.create({
                    data: {
                        name: name,
                        persons: {
                            create: {
                                person: {
                                    create: {
                                        name: person.name,
                                        contacts_info: {
                                            create: {
                                                email: person.contacts.email,
                                                number: person.contacts.number
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    include: {
                        persons: true
                    }
                });
                return res.status(201).json(pet);
            }
            const pet = await prismaClient_1.prismaClient.pet.create({
                data: {
                    name: name
                }
            });
            return res.status(201).json(pet);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ "message": (0, util_1.getLastMessageOfError)(error.message) });
            }
            return res.status(400).json({ "message": "Unknown error" });
        }
    }
}
exports.CreatePetController = CreatePetController;
