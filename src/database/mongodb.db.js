import mongoose from "mongoose";
import env from "../configs/env.config.js";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(env.db.mongodb);
    console.log("CONNECTED :: MONGODB");
  } catch (error) {
    console.error("CONNECT FAIL :: MONGODB", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectMongoDB;
