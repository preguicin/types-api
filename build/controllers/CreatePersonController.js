"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePersonController = void 0;
const prismaClient_1 = require("../database/prismaClient");
class CreatePersonController {
    async handle(req, res) {
        const { name, contacts, pet } = req.body;
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
}
exports.CreatePersonController = CreatePersonController;
