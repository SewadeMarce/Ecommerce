'use server'
import { uid } from "@/utils";
import { connectDB } from "../connection/mongoose";
import Cart from "../models/Cart";
import Coupon from "../models/Coupon";
import Order from "../models/Order";
import { redirect } from "next/navigation";
const user = '6928b5e6d40a3ce89817b0a3'

export async function createAdress(state: { message: string, success: boolean } | undefined, formData: FormData): Promise<{ message: string, success: boolean }> {

    const phone = formData.get('phone');
    const city = formData.get('city');
    const line1 = formData.get('line1');
    const country = formData.get('country');
    const name = formData.get('name');
    const address = {

        phone,
        city,
        line1,
        country,
        name
    }
    await connectDB()

    try {

        const cart = await Cart.findOne({ user })
        const subtotal = cart?.getTotalPrice() || 0;
        const coupon = await Coupon.findOne({ user, isActive: true });
        const discount = coupon?.discount || 0
        const shipping = subtotal > 150 || subtotal === 0 ? 0 : 6.9;

        const taxes = subtotal * 0.15;
        const total = subtotal - discount + shipping + taxes;


        const data = {
            uid: uid(),
            user,
            items: cart?.items,
            subtotal,
            total,
            discount,
            shipping,
            taxes,
            address,
            paymentMethod: 'virement'
        }

        const order = await Order.create(data)
        console.log({ order });

        if (!order) return {
            success: false,
            message: 'Non effectué'
        }


    } catch (error) {
        console.error('Une erreur lors de la création des commande', error);
        console.log('Une erreur lors de la création des commande', error);
        return {
            success: false,
            message: 'Non effectué'
        }
    }
    redirect('/checkout/shipping');

}

export async function createShipping(ship: string): Promise<{ message: string, success: boolean }> {
    await connectDB()


    try {



        const order = await Order.findOneAndUpdate({ user }, { shipMethod: ship?.toString() })

        if (!order) return {
            success: false,
            message: 'Non effectué'
        }


    } catch (error) {
        console.error('Une erreur lors de la création des commande', error);
        return {
            success: false,
            message: 'Non effectué'
        }
    }
    redirect('/checkout/payment')
}
export async function createPayment(state: { message: string, success: boolean } | undefined, formData: FormData): Promise<{ message: string, success: boolean }> {
    await connectDB()

    let id ;

    try {



        const order = await Order.findOneAndUpdate({ user }, { paymentMethod: 'card' })

        if (!order) return {
            success: false,
            message: ' order Non effectué'
        }
        const cart = await Cart.findOneAndDelete({user})
        if (!cart) return {
            success: false,
            message: 'cart Non effectué'
        }
        id = order._id;
        console.log(id);
        
    } catch (error) {
        console.error('Une erreur lors de la création des commande', error);
        return {
            success: false,
            message: 'Non effectué'
        }
    }
    redirect(`/checkout/success/${id}`)
}

export async function getOrder() {

    await connectDB()

    const order = await Order.find({})
    return JSON.parse(JSON.stringify(order))
}