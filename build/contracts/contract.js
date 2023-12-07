"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = void 0;
const core_1 = require("@ts-rest/core");
const zod_1 = require("zod");
const co = (0, core_1.initContract)();
const PostSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    body: zod_1.z.string(),
});
exports.contract = co.router({
    createPost: {
        method: "POST",
        path: "/posts",
        responses: {
            201: PostSchema,
        },
        body: zod_1.z.object({
            title: zod_1.z.string(),
            body: zod_1.z.string(),
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
