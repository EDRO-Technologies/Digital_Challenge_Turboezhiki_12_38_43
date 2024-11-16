import express from "express";
import multer from 'multer';
import path from 'path';
const routerPrivate = express.Router();

import { PrismaClient } from "@prisma/client";
import token from "../lib/token";
import userDataRouter from "./private/user_data";
import userRouter from "./private/user";

const prisma = new PrismaClient();

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, './storage/files/');
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext).replace(/\s+/g, '');
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E4);
      cb(null, `${basename}-${uniqueSuffix}${ext}`);
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
  });

routerPrivate.use(async (req, res, next) => {
    let accessToken
    try {
      accessToken = token.authenticateAccessToken(req);
    } catch (TokenExpiredError) {
      console.log("Token has expired")
      res.status(401).send("Token has expired");
      return;
    }
    if (!accessToken || (!req.cookies["refreshToken"] && process.env["NODE_ENV"] == "production")) {
      console.log("No token has been provided")
      res.status(401).send("No token has been provided");
      return
    } else {
      req.tokenID = accessToken;
  
      // if(process.env["NODE_ENV"] != "production") return next();
  
      const user = await prisma.user.findFirst({
        where: {
          id: req.tokenID
        },
        select: {
          banned: true
        }
      }) 
  
      if(!user){
        res.status(401).send("No user found")
        return
      }
  
      if(user.banned){
        res.status(401).send("You are banned")
        return
      }
  
  
    //   if(!user.active && req.url.split("/")[1] != "code"){
    //     res.status(401).send("Code activation is needed");
    //     return;
    //   }
  
      //Передача в бд время последней интеракции пользователя
      await prisma.user.update({
        where : {
          id: req.tokenID
        },
        data: {
          lastseen: new Date(new Date().toISOString())
        }
      })
  
      next();
    }
});


routerPrivate.get('/logout', async (_req, res) => {
  res.clearCookie("refreshToken");
  res.sendStatus(200)
})

routerPrivate.post('/upload_file', upload.single('file'), async (req, res) => {
  const file = req.file;
  const privateNews = req.body.private == "true" ? true : false
  const users = req.body.users || []
  if (file) {
      const fileId = await prisma.file_url.create({
      data: {
          fileUrl: `${file.filename}`,
          private: privateNews,
          author: req.tokenID
      },
      select: {
          id: true
      }
      })
      for(const i of users){
      await prisma.file_access.create({
          data:{
            fileUrlId: fileId.id,
            userId: i
          }
      })
      }
      res.json({ fileUrlId: fileId.id });
      return 
  } else {
      res.status(400).send('No file uploaded');
      return 
  }
})

  

routerPrivate.use(userDataRouter)
routerPrivate.use(userRouter)

export default routerPrivate