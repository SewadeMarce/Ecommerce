'use server'
import { connectDB } from "../connection/mongoose";
import Coupon from "../models/Coupon";
import { getUser } from "./user.controller";

export const getCoupon = async () => {
    const user = await getUser()
    if (!user) return { success: false, message: 'Veillez vous connectez' }

    try {
        const coupon = await Coupon.findOne({ user: user._id, isActive: true });
        return {
            coupon: coupon || null
        };
    } catch (error) {
        console.log("Error in getCoupon controller", error);
        return {
            success: false,
            message: "Server error"
        };
    }
};
export interface State {

    success: boolean,
    message: string,
    code?: string,
    discount?: number,
}
export const validateCoupon = async (code: string): Promise<State> => {
    await connectDB()
    const user = await getUser()
    if (!user) return { success: false, message: 'Veillez vous connectez' }

    try {
        const coupon = await Coupon.findOne({ code, user: user._id, isActive: true });

        if (!coupon) {
            return {
                success: false,
                message: "Coupon not found"
            };
        }

        if (coupon.expirationDate < new Date()) {
            coupon.isActive = false;
            await coupon.save();
            return {
                success: false,
                message: "Coupon expired"
            };
        }

        return {

            success: true,
            message: "Coupon is valid",
            code: coupon.code,
            discount: coupon.discount,
        };
    } catch (error) {
        console.error("Error in validateCoupon controller", error);
        return {
            success: false,
            message: "Server error"
        };
    }
};
