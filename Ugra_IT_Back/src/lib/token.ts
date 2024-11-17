import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
// import { PrismaClient } from "@prisma/client";
import logger from "./log";

function generateAccessToken(id: number) {
  if(!process.env["ACCESS_TOKEN"])
    throw "No secret key for access token"
  return jwt.sign({id: id}, 
    process.env["ACCESS_TOKEN"], {
    expiresIn: "360000s",
  });
}

function generateRefreshToken(id: number) {
  if(!process.env["REFRESH_TOKEN"])
    throw "No secret key for refresh token"
  return jwt.sign({id: id}, 
    process.env["REFRESH_TOKEN"], {
    expiresIn: "30d",
  });
}

function authenticateAccessToken(req: Request) {
  if(!process.env["ACCESS_TOKEN"])
    throw "No secret key for access token"
  const token = req.cookies.accessToken;
  if (token == null) return false;

  //Для тестов
  if(process.env["NODE_ENV"] != "production" && token == process.env["TESTING_TOKEN"])
    return 1

  const tokenID = jwt.verify(token, process.env["ACCESS_TOKEN"]);

  if (!tokenID) return false;

  return (tokenID as JwtPayload)["id"];
}

function authenticateAccessTokenInSocket(token: string) {
  if(!process.env["ACCESS_TOKEN"])
    throw "No secret key for access token"

  if (token == null) return false;
  const tokenID = jwt.verify(token, process.env["ACCESS_TOKEN"]);

  if (!tokenID) return false;
  return (tokenID as JwtPayload)["id"];
}

async function verifyRefreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  if(!process.env["ACCESS_TOKEN"])
    throw "No secret key for access token"
  if(!process.env["REFRESH_TOKEN"])
    throw "No secret key for refresh token"
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        res.send(400)
        return
    };

    jwt.verify(token, process.env["ACCESS_TOKEN"]);
  } catch (err) {
    if (err instanceof Error && err.name !== "TokenExpiredError") {
      logger.error(err);
      res.sendStatus(403);
      return;
    }
  }
  const refreshToken = jwt.verify(
    req.cookies["refreshToken"],
    process.env["REFRESH_TOKEN"]
  );

  if(!refreshToken) {
    res.status(403).send("Refresh token has been expired");
    return;
  }

  req.refreshToken = (refreshToken as JwtPayload)["id"];
  next()

}

export default {
  generateAccessToken,
  authenticateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  authenticateAccessTokenInSocket,
};