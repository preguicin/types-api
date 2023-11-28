import { Response, Request } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreatePersonController{
	async handle(req: Request, res: Response){
		const {name, contacts, pet} = req.body;
		const person = await prismaClient.person.create({
			data:{
				name: name,
				contacts_info: {
					create: {
						email: contacts.email,
						number: contacts.number,
					} 
				},
				pets:{
					create:{
						pet:{
							create:{
								name: pet.name
							}
						}
					}
				}
			},
			include:{
				pets:true,
				contacts_info: true
			}
		});
		return res.json(person);
	}
}