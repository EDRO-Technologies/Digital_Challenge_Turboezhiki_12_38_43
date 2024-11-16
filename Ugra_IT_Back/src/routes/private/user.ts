import express from "express";
const userRouter = express.Router();

import { PrismaClient } from "@prisma/client";
import inputHandler from "../../handlers/inputHandler";

const prisma = new PrismaClient();

userRouter.get("/user/:id", async (req, res) => {
    const userId = parseInt(req.params.id as string)

    if(!userId){
        res.sendStatus(400)
        return
    }

    const userRow = await prisma.user.findFirst({
        where: {
            id: userId
        },
        select: {
            name: true,
            surname: true,
            middleName: true,
            role: true,
            lastseen: true
        }
    })

    const photoRow = await prisma.user_photo.findFirst({
        where: {
            userId: userId
        },
        select: {
            photoId: true
        }
    })
    
    if(!userRow){
        res.send(404)
        return
    }

    const banned = await prisma.user.findFirst({
        where: {
            id: userId
        },
        select: {
            banned: true
        }
    })

    if(banned?.banned){
        res.send(404)
        return
    }

    let info

    if(userRow.role === 0){
        info = await prisma.programmerInfo.findFirst({
            where: {
                userId: userId
            },
            select: {
                birthDate: true,
                eduStatus: true,
                expYear: true,
                eduPlace: true,
            }
        })
    }
    if(userRow.role === 1){
        info = await prisma.companyInfo.findFirst({
            where: {
                userId: userId
            },
            select: {
                companyName: true,
                inn: true,
                staffNum: true,
                isResident: true,
                isInnovative: true
            }
        })
    }
    res.send({
        ...photoRow,
        ...userRow,
        ...info
    })
})

userRouter.post("/user/avatar", async (req, res) => {
    const photoId = parseInt(req.body.photoId)

    const fileRow = await prisma.file_url.findFirst({
        where: {
            id: photoId,
            author: req.tokenID 
        }
    })

    if(!fileRow){
        res.sendStatus(401)
        return
    }

    const photoRow = await prisma.user_photo.findFirst({
        where: {
            userId: req.tokenID
        }
    })
    let result
    if(!photoRow){
        result = await prisma.user_photo.create({
            data: {
                userId: req.tokenID,
                photoId: photoId
            }
        })
    }
    else {
        result = await prisma.user_photo.update({
            where: {
                id: photoRow.id
            },
            data: {
                photoId: photoId
            }
        })
    }

    res.send(result)
})

export default userRouter