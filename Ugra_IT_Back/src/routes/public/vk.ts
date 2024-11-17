import express, { Request, Response } from "express";
import { VK } from "vk-io";
import axios from "axios";
import bodyParser from "body-parser";

const vk = new VK({
    token: "TO2QYLbzBAoxQgdHN8rW", // Токен VK
});

interface UserInfo {
    id: number;
    first_name: string;
    last_name: string;
    bdate?: string;
    age?: number;
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(data: {
    email: string;
    passwordHash: string;
    name: string;
    surname: string;
    middleName?: string;
    birthDate?: string;
}) {
    try {
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password_hash: data.passwordHash,
                name: data.name,
                surname: data.surname,
                middleName: data.middleName || null,
                role: 0, // Обычный пользователь
                createdAt: new Date(),
                banned: false,
                programmer: data.birthDate
                    ? {
                        create: {
                            birthDate: new Date(data.birthDate),
                            expYear: 0, // Предположительно 0 по умолчанию
                            eduStatus: 0, // Предположительно нет образования
                        },
                    }
                    : undefined,
            },
        });
        return user;
    } catch (error) {
        console.error('Ошибка создания пользователя:', error);
        throw error;
    }
}

// Функция получения данных о пользователях
async function getUserData(userIds: string[]): Promise<UserInfo[]> {
    try {
        const users = await vk.api.users.get({
            user_ids: userIds,
            fields: ["bdate"],
        });

        return users.map((user) => {
            const age = user.bdate ? calculateAge(user.bdate) : undefined;
            return {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                bdate: user.bdate,
            };
        });
    } catch (error) {
        console.error("Ошибка при запросе данных:", error);
        throw error;
    }
}


//В БУДУЩЕМ
// Функция для вычисления возраста
function calculateAge(birthDate: string): number | null {
    const [day, month, year] = birthDate.split(".").map(Number);
    if (!year) return null;
    const now = new Date();
    const birth = new Date(year, month - 1, day);
    let age = now.getFullYear() - birth.getFullYear();
    if (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()))
        age--;
    return age;
}

// Логирование информации о пользователе
function logUserData(user: UserInfo) {
    console.log(`User ID: ${user.id}`);
    console.log(`Name: ${user.first_name} ${user.last_name}`);
    console.log(`Birthdate: ${user.bdate || "Not provided"}`);
    console.log(`Age: ${user.age ?? "Unknown"}`);
}

const VKRouter = express.Router();

// Маршрут для логирования пользователей
VKRouter.post("/log-user", async (req: Request, res: Response) => {
    let { userIds } = req.body;

    userIds = Array.isArray(userIds) ? userIds : [userIds];

    if (!Array.isArray(userIds) || userIds.length === 0) {
        res.status(400).send({ error: "userIds must be a non-empty array" });
        return;
    }

    try {
        const users = await getUserData(userIds);
        users.forEach(logUserData);
        res.send({ success: true, users });
        return;
    } catch (error) {
        console.error("Ошибка при запросе к VK API:", error);
        res.status(500).send({ error: "Internal server error" });
        return;
    }
});;