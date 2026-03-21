import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const {connection} = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`mongoDB connected:`, connection.name,connection.host);
  } catch (error) {}
};
