import mongoose from 'mongoose';

const expertSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

const expert = mongoose.model('expert', expertSchema);

export default expert;