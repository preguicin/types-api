import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { getLastMessageOfError, idToNumber  } from "../../utils/util";

export class PutPersonPetController{
	async handle(req: Request, res: Response){
		const {personId,petId} = req.params;
		const {newPersonId, newPetId} = req.body;
		//creating with one pet
		try {
			if(newPersonId !== undefined && newPetId !== undefined){
				const person = await prismaClient.personPet.update({
					where:{
						personId_petId:{
							personId: idToNumber(personId),
							petId: idToNumber(petId)
						}
					},
					data:{
						personId: newPersonId,
						petId: newPetId
					}
				});
				return res.json(person);
			}
			if(newPersonId!==undefined){
				const person = await prismaClient.personPet.update({
					where:{
						personId_petId:{
							personId: idToNumber(personId),
							petId: idToNumber(petId)
						}
					},
					data:{
						personId: newPersonId
					}
				});
				return res.json(person);
			}
			const person = await prismaClient.personPet.update({
				where:{
					personId_petId:{
						personId: idToNumber(personId),
						petId: idToNumber(petId)
					}
				},
				data:{
					petId: newPetId
				}
			});
			return res.json(person);
		
		} catch (error) {
			if(error instanceof Error){
				return res.status(400).json({"message": getLastMessageOfError(error.message)});
			}
			return res.status(500).json({"message":"Unknown error"});
		}
	}
}