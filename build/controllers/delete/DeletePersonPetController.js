"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePersonPetController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const util_1 = require("../../utils/util");
class DeletePersonPetController {
    async handle(req, res) {
        const { idPet, idPerson } = req.params;
        //creating with one pet
        try {
            await prismaClient_1.prismaClient.personPet.delete({
                where: {
                    personId_petId: {
                        petId: (0, util_1.idToNumber)(idPet),
                        personId: (0, util_1.idToNumber)(idPerson)
                    }
                },
            });
            return res.json({
                "status": "OK",
                "message": "OK"
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ "status": "ERROR", "message": (0, util_1.getLastMessageOfError)(error.message) });
            }
            return res.status(400).json({ "message": "Unknown error" });
        }
    }
}
exports.DeletePersonPetController = DeletePersonPetController;
