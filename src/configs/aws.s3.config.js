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

export { connectS3, s3Client };
