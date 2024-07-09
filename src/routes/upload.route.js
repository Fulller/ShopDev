import { Router } from "express";
import CloudinaryController from "../controllers/cloudinary.controller.js";
import MinioController from "../controllers/minio.controller.js";
import { upload } from "../helpers/multer.helper.js";
import { FileValidate } from "../helpers/validate.helper.js";
import { controller, validate } from "../middlewares/index.js";

const UploadRouter = Router();

UploadRouter.post(
  "/cloudinary/image",
  upload.single("image"),
  validate(FileValidate.singleFile, "file"),
  controller(CloudinaryController.uploadImage)
);
UploadRouter.delete(
  "/cloudinary/image",
  validate(FileValidate.deleteImage, ["query", "body"]),
  controller(CloudinaryController.deleteImage)
);
UploadRouter.post(
  "/minio/file",
  upload.single("file"),
  validate(FileValidate.singleFile, "file"),
  controller(MinioController.uploadFile)
);
UploadRouter.delete(
  "/minio/file",
  validate(FileValidate.deleteFile, ["query", "body"]),
  controller(MinioController.deleteFile)
);

export default UploadRouter;
