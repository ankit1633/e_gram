import mongoose, { mongo } from "mongoose";

const lightSchema = new mongoose.Schema({
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

const Light = mongoose.model('light', lightSchema);

export default Light;