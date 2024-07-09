import multer from "multer";
import env from "../configs/env.config.js";

const limitUpload = env.app.limitUpload;
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * limitUpload,
  },
});

export { upload };
