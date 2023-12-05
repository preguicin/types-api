"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePetController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const util_1 = require("../../utils/util");
class DeletePetController {
    async handle(req, res) {
        const { id } = req.params;
        //creating with one pet
        try {
            await prismaClient_1.prismaClient.pet.delete({
                where: {
                    id: (0, util_1.idToNumber)(id)
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
exports.DeletePetController = DeletePetController;
