import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { getLastMessageOfError, idToNumber  } from "../../utils/util";

export class GetPersonPetController{
	async handle(req: Request, res: Response){
		const {idPet, idPerson} = req.params;
		try {
			const person = await prismaClient.personPet.findFirst({
				where:{
					personId: idToNumber(idPerson),
					petId: idToNumber(idPet),
				},
				include:{
					person:true,
					pet: true
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