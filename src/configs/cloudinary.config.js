import { v2 as cloudinary } from "cloudinary";
import env from "./env.config.js";

const configureCloudinary = () => {
  cloudinary.config(env.cloud.cloudinary);
  console.log("CONFIGURED ::  CLOUDINARY");
};

export { cloudinary, configureCloudinary };
