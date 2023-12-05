import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { getLastMessageOfError, idToNumber  } from "../../utils/util";

export class GetContactsController{
	async handle(req: Request, res: Response){
		const {id} = req.params;
		try {
			const contacts = await prismaClient.contactsInfo.findFirst({
				where:{
					id: idToNumber(id)
				},
				include:{
					person: true
				}
			});

			return res.json(contacts);
		} catch (error) {
			if(error instanceof Error){
				return res.status(400).json({"message": getLastMessageOfError(error.message)});
			}
			return res.status(500).json({"message":"Unknown error"});
		}
	}
}