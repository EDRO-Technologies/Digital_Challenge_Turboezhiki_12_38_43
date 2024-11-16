import crypto from 'crypto';
import argon2 from 'argon2';

async function hashPassword(password: string){
    if(!process.env['PASSWORD_PEPPER'])
        throw "No password pepper"
    password = password + process.env['PASSWORD_PEPPER']
    const hash = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 65536, 
        timeCost: 5,
        parallelism: 2
    });
    return hash
}

async function comparePassword(hash: string, password: string){
    if(!process.env['PASSWORD_PEPPER'])
        throw "No password pepper"
    try{
        password = password + process.env['PASSWORD_PEPPER']
        return await argon2.verify(hash, password)
    }
    catch (err){
        return false
    }
}

export default {
    comparePassword,
    hashPassword
}