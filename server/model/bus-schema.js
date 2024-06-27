import mongoose, { mongo } from "mongoose";

const busSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

const Bus = mongoose.model('bus', busSchema);

export default Bus;