import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { getLastMessageOfError, idToNumber  } from "../../utils/util";

export class GetPersonController{
	async handle(req: Request, res: Response){
		const {id} = req.params;
		try {
			const person = await prismaClient.person.findFirst({
				where:{
					id: idToNumber(id),
				},
				include:{
					contacts_info:true,
					pets: true
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