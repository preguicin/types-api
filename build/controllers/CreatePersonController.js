"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePersonController = void 0;
const prismaClient_1 = require("../database/prismaClient");
const util_1 = require("../utils/util");
class CreatePersonController {
    async handle(req, res) {
        const { name, contacts, pet } = req.body;
        //creating with one pet
        try {
            if (pet !== undefined) {
                if ("id" in pet) {
                    const person = await prismaClient_1.prismaClient.person.create({
                        data: {
                            name: name,
                            contacts_info: {
                                create: {
                                    email: contacts.email,
                                    number: contacts.number,
                                }
                            },
                            pets: {
                                create: {
                                    pet: {
                                        connect: {
                                            id: pet.id
                                        }
                                    }
                                }
                            }
                        },
                        include: {
                            pets: true,
                            contacts_info: true
                        }
                    });
                    return res.json(person);
                }
                const person = await prismaClient_1.prismaClient.person.create({
                    data: {
                        name: name,
                        contacts_info: {
                            create: {
                                email: contacts.email,
                                number: contacts.number,
                            }
                        },
                        pets: {
                            create: {
                                pet: {
                                    create: {
                                        name: pet.name
                                    }
                                }
                            }
                        }
                    },
                    include: {
                        pets: true,
                        contacts_info: true
                    }
                });
                return res.json(person);
            }
            //Creating with none pet
            const person = await prismaClient_1.prismaClient.person.create({
                data: {
                    name: name,
                    contacts_info: {
                        create: {
                            email: contacts.email,
                            number: contacts.number,
                        }
                    }
                },
                include: {
                    contacts_info: true
                }
            });
            return res.json(person);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ "message": (0, util_1.getLastMessageOfError)(error.message) });
            }
            return res.status(400).json({ "message": "Unknown error" });
        }
    }
}
exports.CreatePersonController = CreatePersonController;
