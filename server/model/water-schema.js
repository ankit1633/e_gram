import mongoose, { mongo } from "mongoose";

const waterSchema = new mongoose.Schema({
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

const Water = mongoose.model('water', waterSchema);

export default Water;