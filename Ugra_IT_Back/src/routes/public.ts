import express, { Request, Response, NextFunction } from "express";
import password from '../lib/password';
import { PrismaClient } from "@prisma/client";
import inputHandler from "../handlers/inputHandler";
import token from "../lib/token";
import logger from "../lib/log";
import path from "path";
const routerPublic = express.Router();

const prisma = new PrismaClient();

const day = 86400000

routerPublic.post("/auth/signup", async (req, res) => {
    const credentials = inputHandler.signupHandler(req);
    if (!credentials) {
        res.status(400).send("Invalid credentials");
        return;
    }
    const user = await prisma.user.findFirst({
        where: { 
            email: credentials.email
        },
    });

    let newUser;
    const hash = await password.hashPassword(credentials.password)
    newUser = await prisma.user.create({
    data: {
        name: credentials.name,
        surname: credentials.surname,
        middleName: credentials.middleName,
        email: credentials.email,
        createdAt: new Date(),
        password_hash: hash,
        role: credentials.role,
        banned: false
    },
    });


    const accessToken = token.generateAccessToken(newUser.id);
    const refreshToken = token.generateRefreshToken(newUser.id);

    await prisma.refreshTokens.create({
        data: { 
        refreshToken: refreshToken,
        userId: newUser.id,
        expiresAt: new Date(Date.now() + day * (parseInt(process.env["REFRESH_LIFETIME"] || "365")))
        }
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + day * (parseInt(process.env["REFRESH_LIFETIME"] || "365"))),
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + day * (parseInt(process.env["ACCESS_LIFETIME"] || "30"))),
  });

    res.status(200).send({
        id: newUser.id,
        role: newUser.role,
        name: newUser.name,
        surname: newUser.surname,
        middleName: newUser.middleName
    });
});

routerPublic.post("/auth/signin", async (req, res) => {
    const credentials = inputHandler.signinHandler(req);
    if (!credentials) {
        res.status(400).send("Invalid credentials");
        return;
    }
    const user = await prisma.user.findFirst({
        where: {
        email: credentials.email
        },
    });

    if (!user) {
        res.status(400).send("Wrong email");
        return;
    }

    logger.info("User - " + user.id + " signed in")

    const refreshToken = token.generateRefreshToken(user.id);

    await prisma.refreshTokens.create({
        data: { 
        refreshToken: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + day * (parseInt(process.env["REFRESH_LIFETIME"] || "365")))
        }
    });

    const accessToken = token.generateAccessToken(user.id);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + day * (parseInt(process.env["REFRESH_LIFETIME"] || "365"))),
    });
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + day * (parseInt(process.env["ACCESS_LIFETIME"] || "30"))),
    });
    res.status(200).send({
        id: user.id,
        name: user.name,
        surname: user.surname,
        middleName: user.middleName,
        role: user.role,
    });
});

routerPublic.get("/access_token", token.verifyRefreshToken, async (req: Request, res: Response) => {
    const accessToken = token.generateAccessToken(
      req.refreshToken
    );
    const refreshToken = token.generateRefreshToken(
      req.refreshToken
    )

    const refreshTokenRow = await prisma.refreshTokens.findFirst({
      where: {
        refreshToken: req.cookies.refreshToken
      },
      select: {
        id: true,
        expiresAt: true
      }
    })

    if(!refreshTokenRow || refreshTokenRow.expiresAt < new Date()) {
      res.status(401).send("Refresh token is expired or not present")
      return
    }

    await prisma.refreshTokens.update({
      where: {
        id: refreshTokenRow.id
      },
      data: {
        refreshToken: refreshToken,
        expiresAt: new Date(Date.now() + day * (parseInt(process.env["REFRESH_LIFETIME"] || "365")))
      }
    })

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + day * (parseInt(process.env["REFRESH_LIFETIME"] || "365"))),
    });
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + day * (parseInt(process.env["ACCESS_LIFETIME"] || "30"))),
    });

    logger.info("Requested token by id - " + req.refreshToken)

    res.sendStatus(200)
    return;
  }
);

routerPublic.get('/get_file', async (req, res) => {
  const fileId = req.query["id"]
  if(!fileId){
    res.sendStatus(400)
    return 
  }

  const file = await prisma.file_url.findFirst({
    where: {
      id: +fileId
    },
    select: {
      fileUrl: true,
      private: true
    }
  })

  if(!file){
    res.sendStatus(404)
    return 
  }



  if(req.tokenID || file.private){
    const accessFile = await prisma.file_access.findFirst({
      where: {
          fileUrlId: +fileId,
          userId: req.tokenID 
      }
    })
    if(!accessFile){
      res.sendStatus(404)
      return 
    }
  }
  else if(!req.tokenID && file.private){
    res.send(404)
    return
  }
  const filePath = path.join(__dirname, "..", "..", 'storage/files', file.fileUrl);
  res.sendFile(filePath)
  return 
})

routerPublic.get('/health', (_req, res) => {
  res.status(200).json({ status: 'UP' });
});

export default routerPublic;