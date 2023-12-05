"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutPersonController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const util_1 = require("../../utils/util");
class PutPersonController {
    async handle(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        //creating with one pet
        try {
            const person = await prismaClient_1.prismaClient.person.update({
                where: {
                    id: (0, util_1.idToNumber)(id)
                },
                data: {
                    name: name,
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
exports.PutPersonController = PutPersonController;
