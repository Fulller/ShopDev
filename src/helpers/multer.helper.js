import multer from "multer";
import env from "../configs/env.config.js";

const limitUpload = 1024 * 1024 * env.app.limitUpload;
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: limitUpload,
  },
});

export { upload };
