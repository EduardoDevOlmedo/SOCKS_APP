import mongoose, {Model, Schema} from "mongoose";
import {IUser} from "../interfaces"

const UserSchema = new Schema({
    user: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
})

export const User:  Model<IUser> =  mongoose.models.User || mongoose.model('User', UserSchema);