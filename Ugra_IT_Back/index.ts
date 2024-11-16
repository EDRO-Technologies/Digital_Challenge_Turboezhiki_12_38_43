import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from "cors";
import fs from 'fs';
import rateLimit from 'express-rate-limit';
import routerPublic from "./src/routes/public";
import routerPrivate from "./src/routes/private";
import path from "path";

dotenv.config();

declare global {
    namespace Express {
        interface Request {
        tokenID: number,
        refreshToken: number
        }
    }
}

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(limiter);

app.use(
  cors({
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);

const directoryPath = path.join(__dirname, './storage/files');

if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath, { recursive: true });
  console.log('Директория создана:', directoryPath);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routerPublic)
app.use(routerPrivate)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});