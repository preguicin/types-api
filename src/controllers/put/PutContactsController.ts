import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { getLastMessageOfError, idToNumber  } from "../../utils/util";

export class PutContactsController{
	async handle(req: Request, res: Response){
		const {idPerson} = req.params;
		const {email, number} = req.body;
		//creating with one pet
		try {
			if(email !== undefined && number !== undefined){
				const person = await prismaClient.contactsInfo.update({
					where:{
						personId: idToNumber(idPerson)
					},
					data:{
						email: email,
						number: number
					}
				});
				return res.json(person);
			}
			
			if(number !== undefined){
				const person = await prismaClient.contactsInfo.update({
					where:{
						personId: idToNumber(idPerson)
					},
					data:{
						number: number
					}
				});
				return res.json(person);
			}

			const person = await prismaClient.contactsInfo.update({
				
				where:{
					personId: idToNumber(idPerson)
				},
				data:{
					email: email
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