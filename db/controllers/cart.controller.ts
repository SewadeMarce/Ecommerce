'use server'
import mongoose from "mongoose"
import { connectDB } from "../connection/mongoose"
import Cart from "../models/Cart"
import { revalidatePath } from "next/cache"
import { ITProducts } from "../models/Product"
import Coupon from "../models/Coupon"

const user = '6928b5e6d40a3ce89817b0a3'

export async function addItem(product: mongoose.Types.ObjectId, price: number) {
    await connectDB()
    let cart = await Cart.findOne({ user })

    if (!cart) {
        cart = await Cart.create({
            user,
            items: [{
                product,
                quantity: 1,
                price
            }],
            totalAmount: price
        })
    } else {
        const itemIndex = cart.items.findIndex(item =>
            item.product === product
        )

        if (itemIndex > - 1) {
            cart.items[itemIndex].quantity += 1
        } else {
            cart.items.push({
                product,
                quantity: 1,
                price
            })
        }


        cart.save()
    }
    revalidatePath('/')
    return JSON.parse(JSON.stringify(cart))
}


export async function removeItem(product: mongoose.Types.ObjectId) {

    await connectDB()

    await Cart.findOneAndUpdate({
        user,
    },
        {
            $pull: { items: { product } }
        }
    )
    revalidatePath('/')
}

export async function updateItemQuantity(product: mongoose.Types.ObjectId, quantity: number) {

    await connectDB()

    if (quantity <= 0) return removeItem(product)

    await Cart.findOneAndUpdate(
        {
            user,
            "items.product": product
        },
        {
            $set: { "items.$.quantity": quantity }
        }
    )
    revalidatePath('/')

}
export interface ITCartItems {
    product: ITProducts
    quantity: number
    price: number
    _id: mongoose.Types.ObjectId
}

export interface ITCarts {
    _id: mongoose.Types.ObjectId
    user: mongoose.Types.ObjectId
    items: ITCartItems[]
    totalAmount: number
    totalItem: number
    shipping: number
    taxes: number
    total: number
    subtotal: number
    discount: number

}
export async function getCart(): Promise<ITCarts> {
    await connectDB();

    const cart = await Cart.findOne({ user }).populate('items.product');
    const data = JSON.parse(JSON.stringify(cart))
    const subtotal = cart?.getTotalPrice() || 0;

    const coupon = await Coupon.findOne({ user, isActive: true });
    const discount = coupon?.discount || 0
    const shipping = subtotal > 150 || subtotal === 0 ? 0 : 6.9;

    const taxes = subtotal * 0.15;
    const total = subtotal - discount + shipping + taxes;

    return {
        ...data,
        totalAmount: cart?.getTotalPrice(),
        totalItem: cart?.getTotalItems(),
        shipping,
        taxes,
        total,
        subtotal,
        discount
    }

}





