import mongoose from "mongoose";




export const Connection = async (username,password) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.gjeypus.mongodb.net/`;
    try {
        await mongoose.connect(URL)
        console.log('Database connected successfully');
    } catch(error) {
        console.log(`error while connecting with database` , error.message);
    }
}

export default Connection;
