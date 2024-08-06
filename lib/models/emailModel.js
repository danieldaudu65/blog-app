import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    email: String,
    date: { type: Date, default: Date.now() }
})

const EmailModel = mongoose.models.email || mongoose.model('email', Schema);

export default EmailModel;