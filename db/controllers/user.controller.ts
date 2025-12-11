'use server'
import { comparePassword, generateToken, hashPassword, verifyToken } from "@/utils";
import { connectDB } from "../connection/mongoose";
import User from "../models/User";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function authUser(satate: { success: boolean, message: string } | undefined, formData: FormData): Promise<{ success: false, message: string } | undefined> {
    await connectDB()

    //Récupération et validation des données
    const firstName = (formData.get('firstName') || "").toString();
    const lastName = (formData.get('lastName') || "").toString();
    const email = (formData.get('email') || "").toString();
    const password = (formData.get('password') || "").toString();
    const register = (formData.get('register') || "").toString();
    try {

        if (register) {

            // Vérifier si l'email existe déjà
            const existingUser = await User.findOne({ email })
            console.log(existingUser);

            if (existingUser) return { success: false, message: 'Cet email est déjà utilisé' }

            const hashedPassword = await hashPassword(password)


            const user = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword
            })
            if (!user) return { success: false, message: 'utilisateur non ennrégistré' }

            //Créer une session 

            const cookiesStore = await cookies()
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            const token = generateToken({
                userId: user._id,
                email: user.email,
                role: user.role
            })
            cookiesStore.set('user_session', token,
                {
                    httpOnly: true,
                    secure: true,
                    expires: expiresAt,
                    sameSite: 'lax',
                    path: '/',
                }
            )

            revalidatePath('/')
            return JSON.parse(JSON.stringify(user))
        } else {
            //vérification de l'utilisateur
            const user = await User.findOne({ email })

            if (!user) return { success: false, message: "email ou password invalide" };

            const ispassword = await comparePassword(password, user.password)

            if (!ispassword) return { success: false, message: " email ou password invalide" }

            const cookiesStore = await cookies()
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            const token = generateToken({
                userId: user._id,
                email: user.email,
                role: user.role
            })
            cookiesStore.set('user_session', token,
                {
                    httpOnly: true,
                    secure: true,
                    expires: expiresAt,
                    sameSite: 'lax',
                    path: '/',
                }
            )

            revalidatePath('/')
            return JSON.parse(JSON.stringify(user))
        }
    } catch (error) {
        console.error("erreur lors de l'authentification", error);
        return { success: false, message: 'utilisateur non ennrégistré' }

    }
}

export async function getUser() {

    await connectDB()

    //Récupération et vérification du token
    const cookie = (await cookies()).get('user_session')?.value || ""
    const token = verifyToken(cookie)

    if (!token) {

        return null
    }
    const data = await User.findOne({ _id: token.userId })

    return JSON.parse(JSON.stringify(data))
}


export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('user_session')
    revalidatePath('/')
}