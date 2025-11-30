import mongoose, { model, Model, models, Schema } from "mongoose";

export interface ITCartItem {
    product: mongoose.Types.ObjectId,
    quantity: number,
    price: number
}
export interface ITCart {
    user: mongoose.Types.ObjectId
    items: ITCartItem[],
    totalAmount: number,
    getTotalPrice():number,
    getTotalItems():number
}

const CartItemSchema = new Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    }
})

const CartSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        unique: true,
        default:'6928b5e6d40a3ce89817b0a3'
    },
    items: [CartItemSchema],
    totalAmount: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})

//  Équivalent de votre getTotalItems()
 CartSchema.methods.getTotalItems =function () {
   return this.items.reduce((total:number, item:ITCartItem) => total + item.quantity, 0);
 };

//  Équivalent de votre getTotalPrice()
 CartSchema.methods.getTotalPrice =function () {
   return this.items.reduce((total:number, item:ITCartItem) => total + (item.price * item.quantity), 0);
 };

const Cart: Model<ITCart> = models.Cart || model<ITCart>('Cart', CartSchema)

export default Cart;