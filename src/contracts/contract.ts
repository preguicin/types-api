import { initContract } from "@ts-rest/core";
import { z } from "zod";

const co = initContract();

const PostSchema = z.object({
	id: z.string(),
	title: z.string(),
	body: z.string(),
});

export const contract = co.router({
	createPerson:{
		method:"POST",
		path:"/person",
		responses:{
			201: z.object({
				id: z.number(),
				

			})
		},
		body: z.object({

		})
	},
	createPost: {
		method: "POST",
		path: "/posts",
		responses: {
			201: PostSchema,
		},
		body: z.object({
			title: z.string(),
			body: z.string(),
		}),
		summary: "Create a post",
	},
	getPost: {
		method: "GET",
		path: "/posts/:id",
		responses: {
			200: PostSchema.nullable(),
		},
		summary: "Get a post by id",
	},
});