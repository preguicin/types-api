"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutPersonPetController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const util_1 = require("../../utils/util");
class PutPersonPetController {
    async handle(req, res) {
        const { personId, petId } = req.params;
        const { newPersonId, newPetId } = req.body;
        //creating with one pet
        try {
            if (newPersonId !== undefined && newPetId !== undefined) {
                const person = await prismaClient_1.prismaClient.personPet.update({
                    where: {
                        personId_petId: {
                            personId: (0, util_1.idToNumber)(personId),
                            petId: (0, util_1.idToNumber)(petId)
                        }
                    },
                    data: {
                        personId: newPersonId,
                        petId: newPetId
                    }
                });
                return res.json(person);
            }
            if (newPersonId !== undefined) {
                const person = await prismaClient_1.prismaClient.personPet.update({
                    where: {
                        personId_petId: {
                            personId: (0, util_1.idToNumber)(personId),
                            petId: (0, util_1.idToNumber)(petId)
                        }
                    },
                    data: {
                        personId: newPersonId
                    }
                });
                return res.json(person);
            }
            const person = await prismaClient_1.prismaClient.personPet.update({
                where: {
                    personId_petId: {
                        personId: (0, util_1.idToNumber)(personId),
                        petId: (0, util_1.idToNumber)(petId)
                    }
                },
                data: {
                    petId: newPetId
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
exports.PutPersonPetController = PutPersonPetController;
