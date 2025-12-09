'use server'
import mongoose from "mongoose"
import { connectDB } from "../connection/mongoose"
import Cart from "../models/Cart"
import { revalidatePath } from "next/cache"
import { ITProducts } from "../models/Product"
import Coupon from "../models/Coupon"
import { getUser } from "./user.controller"


export async function addItem(product: mongoose.Types.ObjectId, price: number) {
    await connectDB()
    const user = await getUser()
    if (!user) return
    let cart = await Cart.findOne({ user: user._id })

    if (!cart) {
        cart = await Cart.create({
            user: user._id,
            items: [{
                product,
                quantity: 1,
                price
            }],
            totalAmount: price
        })
    } else {
        const itemIndex = cart.items.findIndex(item =>
            item.product.toString() === product.toString()
        )
        console.log({ itemIndex });

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
    const user = await getUser()
    if (!user) return

    await Cart.findOneAndUpdate({
        user: user._id,
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
    const user = await getUser()
    if (!user) return

    await Cart.findOneAndUpdate(
        {
            user: user._id,
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
    _id: mongoose.Types.ObjectId | undefined
    user: mongoose.Types.ObjectId | null
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
    const user = await getUser()
    if (!user) return {
        _id: undefined,
        user: null,
        items: [],
        totalAmount: 0,
        totalItem: 0,
        shipping: 0,
        taxes: 0,
        total: 0,
        subtotal: 0,
        discount: 0
    }


    const cart = await Cart.findOne({ user: user._id }).populate('items.product');
    const data = JSON.parse(JSON.stringify(cart))
    const subtotal = cart?.getTotalPrice() || 0;

    const coupon = await Coupon.findOne({ user: user._id, isActive: true });
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

export async function getProductOfCart(id: string) {
    await connectDB()
    const user = await getUser()
    if (!user) return
    const cart = await Cart.findOne({ user: user._id }).limit(5);


    return cart?.items.find(obj => obj.product.toString() == id)
}





