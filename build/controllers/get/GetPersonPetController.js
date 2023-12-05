"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPersonPetController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const util_1 = require("../../utils/util");
class GetPersonPetController {
    async handle(req, res) {
        const { idPet, idPerson } = req.params;
        try {
            const person = await prismaClient_1.prismaClient.personPet.findFirst({
                where: {
                    personId: (0, util_1.idToNumber)(idPerson),
                    petId: (0, util_1.idToNumber)(idPet),
                },
                include: {
                    person: true,
                    pet: true
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
exports.GetPersonPetController = GetPersonPetController;
