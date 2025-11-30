import mongoose, { Model } from "mongoose";
import { models } from "mongoose";
export interface ITCoupon {
    code: string
    discount: number,
    expirationDate: Date
    isActive: boolean,
    user: mongoose.Types.ObjectId,
}

const couponSchema = new mongoose.Schema<ITCoupon>(
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
        discount: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        expirationDate: {
            type: Date,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            default:'6928b5e6d40a3ce89817b0a3'

        },
    },
    {
        timestamps: true,
    }
);

const Coupon:Model<ITCoupon> = models.Coupon || mongoose.model<ITCoupon>("Coupon", couponSchema);

export default Coupon;
