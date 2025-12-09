import mongoose, { model, Model, models, Schema } from "mongoose";
import { ITCartItem } from "./Cart";

export interface IAddress {
    _id:mongoose.Types.ObjectId;
    phone: string;
    city: string;
    line1: string;
    country: string;
    name: string;
}

export interface ITOrder {
        _id:mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId,
    items: ITCartItem[],
    uid: string,
    total: number,
    shipMethod:string,
    paymentMethod: 'carte' | 'paypal' | 'virement' | 'cash';
    paymentStatus: 'en_attente' | 'confirmee' | 'expediee' | 'livree' | 'annulee';
    address: IAddress
    status: 'en_attente' | 'payee' | 'echouee' | 'remboursee';
    subtotal: number,
    discount: number,
    shipping: number,
    taxes: number,
    createdAt:Date


}

const AddressSchema = new Schema<IAddress>({
    name: { type: String, required: true },
    city: { type: String, required: true },
    line1: { type: String, required: true },
    country: { type: String, required: true, default: 'France' },
    phone: { type: String, required: true }
});
const OrderItemSchema = new Schema<ITCartItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
});
const OrderSchema = new Schema<ITOrder>({
    uid: { type: String, required: true, unique: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [OrderItemSchema],
    total: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, required: true },
    shipping: { type: Number, required: true },
    taxes: { type: Number, required: true },
    status: {
        type: String,
        enum: ['en_attente', 'confirmee', 'expediee', 'livree', 'annulee'],
        default: 'en_attente'
    },
    address: { type: AddressSchema, required: true },
    shipMethod:{
        type: String,
        enum: ['standard', 'express'],
        default: 'standard'
    },
    paymentMethod: {
        type: String,
        enum: ['carte', 'paypal', 'virement', 'cash'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['en_attente', 'payee', 'echouee', 'remboursee'],
        default: 'en_attente'
    },

}, {
    timestamps: true
});

const Order: Model<ITOrder> = models.Order || model<ITOrder>('Order', OrderSchema)
export default Order