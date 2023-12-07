"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePersonPetController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const util_1 = require("../../utils/util");
class CreatePersonPetController {
    async handle(req, res) {
        const { person, pet } = req.body;
        try {
            if ("id" in person && "id" in pet) {
                const petPerson = await prismaClient_1.prismaClient.personPet.create({
                    data: {
                        person: {
                            connect: {
                                id: person.id
                            }
                        },
                        pet: {
                            connect: {
                                id: pet.id
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
            else if ("id" in pet) {
                const petPerson = await prismaClient_1.prismaClient.personPet.create({
                    data: {
                        pet: {
                            connect: {
                                id: pet.id
                            }
                        },
                        person: {
                            create: {
                                name: person.name,
                                contacts_info: person.cotacts
                            }
                        }
                    },
                    include: {
                        person: true,
                        pet: true
                    }
                });
                return res.status(201).json(petPerson);
            }
            else if ("id" in person) {
                const petPerson = await prismaClient_1.prismaClient.personPet.create({
                    data: {
                        pet: {
                            create: {
                                name: pet.name
                            }
                        },
                        person: {
                            connect: {
                                id: person.id
                            }
                        }
                    }
                });
                return res.status(201).json(petPerson);
            }
            else {
                const petPerson = await prismaClient_1.prismaClient.personPet.create({
                    data: {
                        pet: {
                            create: {
                                name: pet.name
                            }
                        },
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
                    },
                    include: {
                        person: {
                            include: {
                                contacts_info: true
                            }
                        },
                        pet: true
                    }
                });
                return res.status(201).json(petPerson);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ "message": (0, util_1.getLastMessageOfError)(error.message) });
            }
            return res.status(500).json({ "message": "Unknown error" });
        }
    }
}
exports.CreatePersonPetController = CreatePersonPetController;
