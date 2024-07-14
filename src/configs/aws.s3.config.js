import {
  S3Client,
  CreateBucketCommand,
  HeadBucketCommand,
  PutBucketPolicyCommand,
} from "@aws-sdk/client-s3";
import env from "./env.config.js";

const { accessKeyId, region, secretAccessKey, bucketName } = env.cloud.s3;
const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

async function initializeS3() {
  try {
    const headBucketCommand = new HeadBucketCommand({ Bucket: bucketName });
    await s3Client.send(headBucketCommand);
    console.log("Bucket already exists:", bucketName);
  } catch (error) {
    if (error.name === "NotFound") {
      const createBucketCommand = new CreateBucketCommand({
        Bucket: bucketName,
      });
      await s3Client.send(createBucketCommand);
      console.log("Bucket created successfully:", bucketName);
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
    console.log("Bucket policy set successfully:", bucketName);
  } catch (error) {
    console.error("Error setting bucket policy:", error);
  }
}

initializeS3().catch(console.error);

export default s3Client;
