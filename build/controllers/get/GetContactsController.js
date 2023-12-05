"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetContactsController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const util_1 = require("../../utils/util");
class GetContactsController {
    async handle(req, res) {
        const { id } = req.params;
        try {
            const contacts = await prismaClient_1.prismaClient.contactsInfo.findFirst({
                where: {
                    id: (0, util_1.idToNumber)(id)
                },
                include: {
                    person: true
                }
            });
            return res.json(contacts);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ "message": (0, util_1.getLastMessageOfError)(error.message) });
            }
            return res.status(500).json({ "message": "Unknown error" });
        }
    }
}
exports.GetContactsController = GetContactsController;
