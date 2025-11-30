import mongoose, { Document, model, Model, models, Schema } from "mongoose";
export interface ITVarient {
    color: string[],
    size: string[],
}
export interface ITProducts extends Document {
    _id: mongoose.Types.ObjectId
    title: string,
    brand: string,
    category: string,
    price: number,
    rating: number,
    reviews: number,
    badges: string[],
    images: string[],
    variants: ITVarient,
    stock: number,
    description: string,
    createdAt: Date;
    updatedAt: Date;
}


const productsSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    brand: {
        type: String,
        required: true,

    },
    category: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: {
        type: Number,
        default: 0
    },
    badges: {
        type: [{type:String}]
    },
    images: {
        type: [{type:String}]
    },
    variants: {
        color: [{type:String}],
        size: [{type:String}]
        ,
    },
    stock: {
        type: Number
    },
    description: {
        type: String
    },
    createdAt: Date,
    updatedAt: Date

})

const Product:Model<ITProducts> = models.Product || model<ITProducts>('Product',productsSchema)
export default Product