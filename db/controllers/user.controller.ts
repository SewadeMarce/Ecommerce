import { hashPassword } from "@/utils";
import { connectDB } from "../connection/mongoose";
import User from "../models/User";

export async function createUser() {
    await connectDB()

    try {

        const hashPasswo = hashPassword('marce123')
        const data = {
            firstName: 'Marce 1',
            lastName: 'KEKEY',
            email: 'marce@mail.com',
            password: hashPasswo,
            role: 'client',
        }
        const user = await User.create(data)
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        console.log("erreur lors de l'insciption", error);
        return
    }
}

export async function getUser() {

    await connectDB()

    const data = await User.find()

    return JSON.parse(JSON.stringify(data))
}