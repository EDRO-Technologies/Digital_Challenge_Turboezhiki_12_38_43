import express from "express";
const checklistRouter = express.Router();

import { PrismaClient } from "@prisma/client";
import inputHandler from "../../handlers/inputHandler";
import { getChecklist } from "../../lib/ai";

const prisma = new PrismaClient();

checklistRouter.get("/checklist", async (req, res) => {
    const goal = inputHandler.defaultHandler(req.body.goal)

    if(!goal){
        res.send(400)
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

    res.send({response: aiResponse})
})

export default checklistRouter