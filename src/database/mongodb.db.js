import mongoose from "mongoose";
import env from "../configs/env.config.js";

const mongodbURl = env.db.mongodb;

class MongoDB {
  static instance;
  constructor() {
    this.connect();
  }
  connect() {
    mongoose
      .connect(mongodbURl)
      .then(() => {
        console.log("Connected to MongoDB successfully");
      })
      .catch(() => {
        console.log("Connection to MongoDB failed");
      });
  }
  static async getInstance() {
    if (!MongoDB.instance) {
      this.instance = new MongoDB();
    }
    return this.instance;
  }
}

export default MongoDB;
