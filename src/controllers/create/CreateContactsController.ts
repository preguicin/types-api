import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { getLastMessageOfError  } from "../../utils/util";

export class CreateContactsController{
	async handle(req:Request, res:Response){
		const {person, email, number} = req.body;
		try {

			if(email === undefined ){
				throw new Error("email is empty");
			}else if(number === undefined){
				throw new Error("number is empty");
			}

			if("pet" in person){
				const contacts = await prismaClient.contactsInfo.create({
					data:{
						email: email,
						number: number,
						person:{
							create:{
								name: person.name,
								pets:{
									create:{
										pet:{
											create:{
												name: person.pet.name
											}
										}
									}
								}
							}
						}
					},
					include:{
						person: true,
					}
				});
				return res.json(contacts);
			}
			const contacts = await prismaClient.contactsInfo.create({
				data:{
					email: email,
					number: number,
					person:{
						create:{
							name: person.name
						}
					}
				},
				include:{
					person:true
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