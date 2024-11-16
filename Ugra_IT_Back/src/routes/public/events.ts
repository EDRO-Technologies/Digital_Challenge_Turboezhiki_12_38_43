import express from "express";
const eventsRouter = express.Router();

import { PrismaClient } from "@prisma/client";
import inputHandler from "../../handlers/inputHandler";

const prisma = new PrismaClient();

eventsRouter.post("/event", async (req, res) => {
    const skillData = req.body.skilIds.map((id: number) => ({ skillId: id }));
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
        const skillsRows = await prisma.skill_to_event.createMany({
            data: skillData,
        })
        res.send({
            ...skillData,
            ...result
        })
    } catch (err) {
        res.sendStatus(400)
        return
    }
})

eventsRouter.get("/event", async (req, res) => {
    const page = parseInt(req.query.page as string) || 0
    const searchString = inputHandler.defaultHandler(req.query.searchString as string) || ""

    const pageSize = 10

    const eventRows = await prisma.event.findMany({
        where: {
            name: {
                contains: searchString,
                mode: 'insensitive'
            }
        },
        skip: page * pageSize,
        take: pageSize
    })

    res.send(eventRows)
})

export default inputHandler