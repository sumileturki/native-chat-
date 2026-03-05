import { Router } from "express";
import { requireAuth } from "../../lib/require-auth.js";
import { discover, listFriends, sendRequest } from "./friend.controller.js";

export const friendRouter = Router()

friendRouter.use(requireAuth);

// send Request
friendRouter.post("/request" , sendRequest);


// list frind
friendRouter.get("/list" , listFriends);

// discove
friendRouter.get("/discover" , discover);
