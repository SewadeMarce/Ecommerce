import bcrypt from 'bcryptjs';
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken'
import mongoose from 'mongoose';
export const currency = (n:number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
export const cls = (...c:string[]) => c.filter(Boolean).join(" ");
export const uid = () => `ORD-${Math.random().toString(36).slice(2, 9)}`.toUpperCase();


const JWT_SECRET: Secret = process.env.JWT_SECRET!
const  JWT_EXPIRE ='7d'
const opts:SignOptions = {
    expiresIn:JWT_EXPIRE
}
 interface ITPayload {
    userId:mongoose.Types.ObjectId
    email:string
    role:string
 }
export function generateToken(payload:ITPayload | string | object | Buffer<ArrayBufferLike>) {

    return  jwt.sign(payload,JWT_SECRET,opts)
 
}
export  function verifyToken(token:string):ITPayload | JwtPayload | null {

    try {
        return  jwt.verify(token,JWT_SECRET) as ITPayload
    } catch (error) {
       // console.error('erreur lors de la vérification du token',error);
        return null
        
    }

}

export async function hashPassword(params:string):Promise<string> {
    return await bcrypt.hash(params,10)
    
}

export function comparePassword(password:string,hashedPassword:string):Promise<boolean> {
    return bcrypt.compare(password,hashedPassword)
}

