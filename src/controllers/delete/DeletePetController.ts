import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { getLastMessageOfError, idToNumber  } from "../../utils/util";

export class DeletePetController{
	async handle(req: Request, res: Response){
		const {id} = req.params;
		//creating with one pet
		try {
			await prismaClient.pet.delete({
				where:{
					id: idToNumber(id)
				},
			});
			return res.json({
				"status": "OK",
				"message": "OK"
			});
			
		} catch (error) {
			if(error instanceof Error){
				return res.status(400).json({"status": "ERROR", "message": getLastMessageOfError(error.message)});
			}
			return res.status(400).json({"message":"Unknown error"});
		}
	}
}