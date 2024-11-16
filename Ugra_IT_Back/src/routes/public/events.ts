import express from "express";
const eventsRouter = express.Router();

import { PrismaClient } from "@prisma/client";
import inputHandler from "../../handlers/inputHandler";

const prisma = new PrismaClient();

eventsRouter.post("/event", async (req, res) => {
    const userRow = await prisma.user.findFirst({
        where: {
            id: req.tokenID
        },
        select: {
            role: true
        }
    })

    if(userRow?.role != 3 && userRow?.role != 4){
        res.sendStatus(401)
        return
    }

    try{
        const result = await prisma.event.create({
            data: req.body
        })
        res.send(result)
    } catch (err) {
        res.sendStatus(400)
        return
    }
})

eventsRouter.get("/event")

export default inputHandler