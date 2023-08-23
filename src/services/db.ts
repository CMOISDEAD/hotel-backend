import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://VIKTORDOOM:Imnotafraid31@cluster0.f7m4yts.mongodb.net/",
    );
    console.log("Database connected");
  } catch (error) {
    console.error(error);
  }
};