import MinIO from "../database/minio.cloud.js";
import env from "../configs/env.config.js";
import createHttpError from "http-errors";
import { convertToSlug } from "../utils/index.js";

const bucketName = env.db.minio.bucketName;
const MinioService = {
  uploadFile: async function (file) {
    const fileName = `${Date.now()}_${convertToSlug(file.originalname)}`;
    const metaData = {
      "Content-Type": file.mimetype,
    };
    const fileData = Buffer.isBuffer(file.buffer)
      ? file.buffer
      : Buffer.from(file.buffer);
    try {
      await MinIO.putObject(bucketName, fileName, fileData, metaData);
      const expiryTime = 7 * 24 * 60 * 60;
      const fileUrl = await MinIO.presignedGetObject(
        bucketName,
        fileName,
        expiryTime
      );
      const cleanUrl = fileUrl.split("?")[0];
      return cleanUrl;
    } catch (err) {
      throw createHttpError(400, "api-err-upload-01");
    }
  },
  deleteFile: async function (url) {
    try {
      const urlSplited = url.split("/");
      const fileName = urlSplited.pop();
      const bucketName = urlSplited.pop();
      await MinIO.removeObject(bucketName, fileName);
    } catch {
      throw createHttpError(400, "api-err-upload-02");
    }
  },
};

export default MinioService;
