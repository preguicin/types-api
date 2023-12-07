"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContactsController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const util_1 = require("../../utils/util");
class CreateContactsController {
    async handle(req, res) {
        const { person, email, number } = req.body;
        try {
            if (email === undefined) {
                throw new Error("email is empty");
            }
            else if (number === undefined) {
                throw new Error("number is empty");
            }
            if ("pet" in person) {
                const contacts = await prismaClient_1.prismaClient.contactsInfo.create({
                    data: {
                        email: email,
                        number: number,
                        person: {
                            create: {
                                name: person.name,
                                pets: {
                                    create: {
                                        pet: {
                                            create: {
                                                name: person.pet.name
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    include: {
                        person: true,
                    }
                });
                return res.status(201).json(contacts);
            }
            const contacts = await prismaClient_1.prismaClient.contactsInfo.create({
                data: {
                    email: email,
                    number: number,
                    person: {
                        create: {
                            name: person.name
                        }
                    }
                },
                include: {
                    person: true
                }
            });
            return res.status(201).json(contacts);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ "message": (0, util_1.getLastMessageOfError)(error.message) });
            }
            return res.status(500).json({ "message": "Unknown error" });
        }
    }
}
exports.CreateContactsController = CreateContactsController;
