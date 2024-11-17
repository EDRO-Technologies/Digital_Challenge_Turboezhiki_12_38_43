import express from "express";
const userDataRouter = express.Router();

import { PrismaClient } from "@prisma/client";
import inputHandler from "../../handlers/inputHandler";

const prisma = new PrismaClient();

userDataRouter.post("/data/programmer", async (req, res) => {
    const birthDate = inputHandler.defaultHandler(req.body.birthDate) 
    const eduStatus = parseInt(req.body.eduStatus) 
    const expYear = parseInt(req.body.expYear) 
    const eduPlace = inputHandler.defaultHandler(req.body.eduPlace) || null
    console.log(req.body,!birthDate,  expYear === undefined, eduStatus === undefined, eduStatus < 0, eduStatus > 8)
    // const birthDate = inputHandler.defaultHandler(req.body.birthDate) 

    if(!birthDate || expYear === undefined || eduStatus === undefined || eduStatus < 0 || eduStatus > 8){
        res.status(400).send("Данные введены неправильно")
        return
    }

    const dataRow = await prisma.programmerInfo.findFirst({
        where: {
            userId: req.tokenID 
        }
    })

    if(dataRow){
        res.sendStatus(409)
        return
    }

    const response = await prisma.programmerInfo.create({
        data: {
            userId: req.tokenID,
            birthDate: new Date(birthDate as string),
            eduStatus: eduStatus,
            expYear: expYear,
            eduPlace: eduPlace
        }
    })

    res.sendStatus(200)
})

userDataRouter.post("/data/company", async (req, res) => {
    const companyName = inputHandler.defaultHandler(req.body.companyName) 
    const staffNum = parseInt(req.body.staffNum) 
    const isResident = Boolean(req.body.isResident)
    const isInnovative = Boolean(req.body.isInnovative)
    const inn = inputHandler.defaultHandler(req.body.inn) 
    // const birthDate = inputHandler.defaultHandler(req.body.birthDate) 

    if(!companyName || !staffNum || !isResident || !isInnovative || !inn){
        res.status(400).send("Данные введены неправильно")
        return
    }

    const dataRow = await prisma.companyInfo.findFirst({
        where: {
            userId: req.tokenID 
        }
    })

    if(dataRow){
        res.sendStatus(409)
        return
    }

    const response = await prisma.companyInfo.create({
        data: {
            userId: req.tokenID,
            isInnovative: isInnovative,
            companyName: companyName,
            staffNum: staffNum,
            isResident: isResident,
            inn: inn
        }
    })

    res.sendStatus(200)
})

userDataRouter.get("/data/skill/search", async (req, res) => {
    const page = parseInt(req.query.page as string) || 0
    const searchString = inputHandler.defaultHandler(req.query.searchString as string) || ""

    const pageSize = 10

    const skillRows = await prisma.skill.findMany({
        where: {
            name: {
                contains: searchString,
                mode: 'insensitive', 
            },
        },
        skip: page * pageSize,
        take: pageSize
    })

    res.send(skillRows)
})

userDataRouter.get("/data/skill/user/:id", async (req, res) => {
    const userId = parseInt(req.params.id)

    if(userId === undefined){
        res.sendStatus(400)
        return
    }

    const userSkillsRows = await prisma.skill_to_user.findMany({
        where:{
            userId: userId
        },
        select: {
            skill: {
                select: {
                    name: true,
                },
            }
        }
    })

    res.send(userSkillsRows)
})

userDataRouter.post("/data/skill", async (req, res) => {
    const skillId = parseInt(req.query.skillId as string)

    if(skillId === undefined){
        res.sendStatus(400)
        return
    }

    const skillRow = await prisma.skill.findFirst({
        where: {
            id: skillId
        }
    })

    const skillToUserRow = await prisma.skill_to_user.findFirst({
        where: {
            skillId: skillId,
            userId: req.tokenID
        }
    })

    if(skillToUserRow){
        res.sendStatus(409)
        return
    }

    if(!skillId){
        res.sendStatus(404)
        return
    }

    const result = await prisma.skill_to_user.create({
        data: {
            skillId: skillId,
            userId: req.tokenID,
            verified: false
        }
    })

    res.send(result)
})

userDataRouter.post("/data/skill/upload", async (req, res) => {
    const skillsNames = req.body.skills
    const skillData = skillsNames.map((name: string) => ({ name: name }));

    await prisma.skill.createMany({
        data: skillData
    })

    res.sendStatus(200)
})


export default userDataRouter