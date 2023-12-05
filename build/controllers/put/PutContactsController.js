"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutContactsController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const util_1 = require("../../utils/util");
class PutContactsController {
    async handle(req, res) {
        const { idPerson } = req.params;
        const { email, number } = req.body;
        //creating with one pet
        try {
            if (email !== undefined && number !== undefined) {
                const person = await prismaClient_1.prismaClient.contactsInfo.update({
                    where: {
                        personId: (0, util_1.idToNumber)(idPerson)
                    },
                    data: {
                        email: email,
                        number: number
                    }
                });
                return res.json(person);
            }
            if (number !== undefined) {
                const person = await prismaClient_1.prismaClient.contactsInfo.update({
                    where: {
                        personId: (0, util_1.idToNumber)(idPerson)
                    },
                    data: {
                        number: number
                    }
                });
                return res.json(person);
            }
            const person = await prismaClient_1.prismaClient.contactsInfo.update({
                where: {
                    personId: (0, util_1.idToNumber)(idPerson)
                },
                data: {
                    email: email
                }
            });
            return res.json(person);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ "message": (0, util_1.getLastMessageOfError)(error.message) });
            }
            return res.status(500).json({ "message": "Unknown error" });
        }
    }
}
exports.PutContactsController = PutContactsController;
