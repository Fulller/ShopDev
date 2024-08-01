import { s3Client } from "../configs/aws.s3.config.js";
import env from "../configs/env.config.js";
import { STORAGE_PATH } from "../configs/const.config.js";
import { convertToSlug, s3ToServer } from "../utils/index.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
const { bucketName } = env.cloud.s3;
const { serverUrl } = env.app;

const AWSS3Service = {
  async uploadFile(file) {
    const fileName = `${Date.now()}_${convertToSlug(file.originalname)}`;
    const buffer = Buffer.isBuffer(file.buffer)
      ? file.buffer
      : Buffer.from(file.buffer);
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: file.mimetype,
    };
    await s3Client.send(new PutObjectCommand(params));
    return s3ToServer({ serverUrl, fileName, storagePath: STORAGE_PATH.S3 });
  },
};

export default AWSS3Service;
