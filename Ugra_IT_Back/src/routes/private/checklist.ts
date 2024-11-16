import express from "express";
const checklistRouter = express.Router();

import { PrismaClient } from "@prisma/client";
import inputHandler from "../../handlers/inputHandler";
import { getChecklist } from "../../lib/ai";

const prisma = new PrismaClient();

checklistRouter.get("/checklist", async (req, res) => {
    const goal = inputHandler.defaultHandler(req.query.goal as string)

    if(!goal){
        res.sendStatus(400)
        return
    }

    if(goal.length < 10 || goal.length > 300){
        res.status(400).send("Слишком большой или слишком маленький запрос")
        return
    }

    const userSkillsRows = await prisma.skill_to_user.findMany({
        where:{
            userId: req.tokenID
        },
        select: {
            skill: {
                select: {
                    name: true,
                },
            }
        }
    })

    const skillNames = userSkillsRows.map(row => row.skill.name);

    const aiResponse = await getChecklist(goal, skillNames.join())

    await prisma.checklist_history.create({
        data: {
            userId: req.tokenID,
            text: aiResponse
        }
    })

    res.send({response: aiResponse})
})

checklistRouter.get("/checklist/history", async (req, res) => {
    const page = parseInt(req.query.page as string) || 0

    const pageSize = 10

    const skillRows = await prisma.checklist_history.findMany({
        where: {
            userId: req.tokenID
        },
        skip: page * pageSize,
        take: pageSize
    })

    res.send(skillRows)
})

export default checklistRouter