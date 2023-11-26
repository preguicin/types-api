import { Router } from "express";

const router: Router = Router();

router.get("/", ()  => {console.log("request received");});

export { router };