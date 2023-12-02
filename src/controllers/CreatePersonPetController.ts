import { Response, Request } from "express";
import { prismaClient } from "../database/prismaClient";
import { getLastMessageOfError  } from "../utils/util";

export class CreatePersonPetController{
	async handle(req:Request,res:Response){
		const {person, pet} = req.body;
		try {
			if("id" in person && "id" in pet){
				const petPerson = await prismaClient.personPet.create({
					data: {
						person: {
							connect: {
								id: person.id
							}
						},
						pet: {
							connect: {
								id: pet.id
							}
						},
						assignedAt: new Date()
					},
					include: {
						person: true,
						pet: true
					}
					
				});
				return res.json(petPerson);
			}
			else if("id" in pet){
				const petPerson = await prismaClient.personPet.create({
					data:{
						pet:{
							connect:{
								id:pet.id
							}
						},
						person:{	
							create:{
								name: person.name,
								contacts_info: person.cotacts 
							}
						}
					},
					include:{
						person:true,
						pet:true
					}
				});
				return res.json(petPerson);
			}
			else if("id" in person){
				const petPerson = await prismaClient.personPet.create({
					data:{
						pet:{
							create:{
								name: pet.name
							}
						},
						person:{	
							connect:{
								id: person.id
							}
						}
					}
				});
				return res.json(petPerson);
			}else{
				const petPerson = await prismaClient.personPet.create({
					data:{
						pet:{
							create:{
								name: pet.name
							}
						},
						person:{	
							create:{
								name: person.name,
								contacts_info: person.cotacts 
							}
						}
					},
					include:{
						person:true,
						pet:true
					}
				});
				return res.json(petPerson);
			}
			
		} catch (error) {
			if(error instanceof Error){
				return res.status(400).json({"message": getLastMessageOfError(error.message)});
			}
			return res.status(400).json({"message":"Unknown error"});
		}
	}
}