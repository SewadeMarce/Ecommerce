import { model, Model, models, Schema } from "mongoose";

export interface ITUser {
    firstName:string,
    lastName:string,
    password:string,
    email:string,
    role:'client' | 'admin',
}

const UserSchema =  new Schema<ITUser>({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['client','admin'],
        default:'client'
    }
}, { 
  timestamps: true 
})

const User: Model<ITUser> = models.User || model<ITUser>('User',UserSchema)
export default User