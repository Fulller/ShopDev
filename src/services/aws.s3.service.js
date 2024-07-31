import { s3Client } from "../configs/aws.s3.config.js";
import env from "../configs/env.config.js";
import { convertToSlug } from "../utils/index.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
const { region, bucketName } = env.cloud.s3;

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

    try {
      const command = new PutObjectCommand(params);
      const data = await s3Client.send(command);
      const location = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
      console.log(`File uploaded successfully at ${location}`);
      return location;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  },
};

export default AWSS3Service;
