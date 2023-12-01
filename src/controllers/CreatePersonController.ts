import { Response, Request } from "express";
import { prismaClient } from "../database/prismaClient";
import { getLastMessageOfError  } from "../utils/util";

export class CreatePersonController{
	async handle(req: Request, res: Response){
		const {name, contacts, pet} = req.body;
		//creating with one pet
		try {
			
			if(pet !== undefined){
				if("id" in pet){					
					const person = await prismaClient.person.create({
						data: {
							name: name,
							contacts_info: {
								create: {
									email: contacts.email,
									number: contacts.number,
								}
							},
							pets: {
								create:{
									pet:{
										connect:{
											id:pet.id
										}
									}
								}
							}
						},
						include: {
							pets: true,
							contacts_info: true
						}
					});
					return res.json(person);
				}
				const person = await prismaClient.person.create({
					data: {
						name: name,
						contacts_info: {
							create: {
								email: contacts.email,
								number: contacts.number,
							}
						},
						pets: {
							create:{
								pet:{
									create:{
										name: pet.name
									}
								}
							}
						}
					},
					include: {
						pets: true,
						contacts_info: true
					}
				});
				return res.json(person);
			}
			
			//Creating with none pet
			const person = await prismaClient.person.create({
				data: {
					name: name,
					contacts_info: {
						create: {
							email: contacts.email,
							number: contacts.number,
						}
					}
				},
				include: {
					contacts_info: true
				}
			});
			return res.json(person);
		
		} catch (error) {
			if(error instanceof Error){
				return res.status(400).json({"message": getLastMessageOfError(error.message)});
			}
			return res.status(400).json({"message":"Unknown error"});
		}
	}
}