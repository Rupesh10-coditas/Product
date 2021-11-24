import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
})

export interface User extends mongoose.Document {
    id: string,
    name: String,
    username: string,
    password: string
}