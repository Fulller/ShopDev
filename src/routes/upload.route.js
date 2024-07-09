import { Router } from "express";
import CloudinaryController from "../controllers/cloudinary.controller.js";
import MinioController from "../controllers/minio.controller.js";
import { upload } from "../helpers/multer.helper.js";
import { controller } from "../middlewares/index.js";

const UploadRouter = Router();

UploadRouter.post(
  "/cloudinary/image",
  upload.single("image"),
  controller(CloudinaryController.uploadImage)
);
UploadRouter.delete(
  "/cloudinary/image",
  controller(CloudinaryController.deleteImage)
);
UploadRouter.post(
  "/minio/file",
  upload.single("file"),
  controller(MinioController.uploadFile)
);
UploadRouter.delete("/minio/file", controller(MinioController.deleteFile));

export default UploadRouter;
