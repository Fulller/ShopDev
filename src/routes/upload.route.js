import { Router } from "express";
import CloudinaryController from "../controllers/cloudinary.controller.js";
// import MinioController from "../controllers/minio.controller.js";
import AWSS3Controller from "../controllers/aws.s3.controller.js";
import { upload } from "../helpers/multer.helper.js";
import { UploadValidate } from "../helpers/validate.helper.js";
import {
  controller,
  validate,
  checkPermission,
  authenticate,
} from "../middlewares/index.js";

const UploadRouter = Router();

UploadRouter.use(authenticate);
UploadRouter.post(
  "/cloudinary/image",
  checkPermission({ action: "create", possession: "own", resource: "file" }),
  upload.single("image"),
  validate(UploadValidate.singleFile, "file"),
  controller(CloudinaryController.uploadImage)
);
UploadRouter.delete(
  "/cloudinary/image",
  checkPermission({ action: "delete", possession: "own", resource: "file" }),
  validate(UploadValidate.deleteImage, ["query", "body"]),
  controller(CloudinaryController.deleteImage)
);
// UploadRouter.post(
//   "/minio/file",
//   upload.single("file"),
//   validate(UploadValidate.singleFile, "file"),
//   controller(MinioController.uploadFile)
// );
// UploadRouter.delete(
//   "/minio/file",
//   validate(UploadValidate.deleteFile, ["query", "body"]),
//   controller(MinioController.deleteFile)
// );

UploadRouter.post(
  "/aws/s3/file",
  checkPermission({ action: "create", possession: "own", resource: "file" }),
  upload.single("file"),
  validate(UploadValidate.singleFile, "file"),
  controller(AWSS3Controller.uploadFile)
);
UploadRouter.delete(
  "/aws/s3/file",
  checkPermission({ action: "delete", possession: "own", resource: "file" }),
  validate(UploadValidate.deleteFile, ["query", "body"]),
  controller(AWSS3Controller.deleteFile)
);

export default UploadRouter;
