import {
  S3Client,
  CreateBucketCommand,
  HeadBucketCommand,
  PutBucketPolicyCommand,
} from "@aws-sdk/client-s3";
import { createProxyMiddleware } from "http-proxy-middleware";
import { STORAGE_PATH, PROXY_PATH } from "../configs/const.config.js";
import { replaceString } from "../utils/index.js";
import env from "./env.config.js";

const { accessKeyId, region, secretAccessKey, bucketName } = env.cloud.s3;
const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

async function connectS3() {
  try {
    const headBucketCommand = new HeadBucketCommand({ Bucket: bucketName });
    await s3Client.send(headBucketCommand);
  } catch (error) {
    if (error.name === "NotFound") {
      const createBucketCommand = new CreateBucketCommand({
        Bucket: bucketName,
      });
      await s3Client.send(createBucketCommand);
    } else {
      console.error("Error checking bucket existence:", error);
      throw error;
    }
  }

  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: ["s3:GetObject"],
        Resource: [`arn:aws:s3:::${bucketName}/*`],
      },
    ],
  };

  const putBucketPolicyCommand = new PutBucketPolicyCommand({
    Bucket: bucketName,
    Policy: JSON.stringify(policy),
  });

  try {
    await s3Client.send(putBucketPolicyCommand);
  } catch (error) {
    console.error("Error setting bucket policy:", error);
    return;
  }
  console.log("CONNECTED :: AWS :: S3");
}
async function configureProxyS3(app) {
  const { bucketName, region } = env.cloud.s3;
  const target = replaceString(PROXY_PATH.S3, {
    bucketName,
    region,
  });
  app.use(
    STORAGE_PATH.S3,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^${STORAGE_PATH.S3}`]: "",
      },
    })
  );
  console.log("CONFIGURED ::  PROXY :: S3");
}
export { connectS3, s3Client, configureProxyS3 };
