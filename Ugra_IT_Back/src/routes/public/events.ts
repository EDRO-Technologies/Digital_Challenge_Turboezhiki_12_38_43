import express from "express";
const eventsRouter = express.Router();

import { PrismaClient } from "@prisma/client";
import inputHandler from "../../handlers/inputHandler";

const prisma = new PrismaClient();

// eventsRouter.post("/event", async (req, res) => {
//     const userRow = await prisma.user.findFirst({
//         where: {
//             id: req.tokenID
//         },
//         select: {
//             role: true
//         }
//     })

//     if
// })




export default inputHandler