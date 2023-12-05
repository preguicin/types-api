import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { getLastMessageOfError, idToNumber  } from "../../utils/util";

export class PutPetController{
	async handle(req: Request, res: Response){
		const {id} = req.params;
		const {name} = req.body;
		//creating with one pet
		try {
			
			const person = await prismaClient.pet.update({
				where:{
					id: idToNumber(id)
				},
				data:{
					name: name,
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