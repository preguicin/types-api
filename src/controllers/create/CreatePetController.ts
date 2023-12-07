import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { getLastMessageOfError  } from "../../utils/util";

export class CreatePetController{
	async handle(req: Request, res: Response){
		const {name, person} = req.body;
		//creating with one pet
		try {
			
			if(person !== undefined){
				if("id" in person){
					const pet = await prismaClient.pet.create({
						data: {
							name: name,
							persons:{
								create:{
									person:{
										connect:{
											id: person.id
										}
									}
								}
							}
						},
						include: {
							persons: true
						}
					});
					return res.status(201).json(pet);
				}

				const pet = await prismaClient.pet.create({
					data: {
						name: name,
						persons:{
							create:{
								person:{
									create:{
										name: person.name,
										contacts_info:{
											create:{
												email: person.contacts.email,
												number: person.contacts.number
											}
										}
									}
								}
							}
						}
					},
					include: {
						persons: true
					}
				});
				return res.status(201).json(pet);				
			}

			const pet = await prismaClient.pet.create({
				data: {
					name: name
				}
			});
			return res.status(201).json(pet);
		} catch (error) {
			if(error instanceof Error){
				return res.status(400).json({"message": getLastMessageOfError(error.message)});
			}
			return res.status(400).json({"message":"Unknown error"});
		}
	}
}