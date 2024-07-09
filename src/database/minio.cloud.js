import * as Minio from "minio";
import env from "../configs/env.config.js";

const minioClient = new Minio.Client({
  endPoint: env.db.minio.endPoint,
  port: env.db.minio.port,
  // region: env.db.aws.region,
  useSSL: false,
  accessKey: env.db.minio.accessKey,
  secretKey: env.db.minio.secretKey,
  // Adding CORS configuration
  corsRule: [
    {
      AllowedHeaders: ["*"],
      AllowedMethods: ["GET", "HEAD", "PUT"],
      AllowedOrigins: ["*"],
      ExposeHeaders: [],
      MaxAgeSeconds: 3000,
    },
  ],
});

const bucketName = env.db.minio.bucketName;

async function initializeMinio() {
  try {
    const bucketExists = await minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await minioClient.makeBucket(bucketName);
      console.log("Bucket created successfully:", bucketName);
    } else {
      console.log("Bucket already exists:", bucketName);
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

    await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
    console.log("Bucket policy set successfully:", bucketName);
  } catch (err) {
    console.error("Error initializing MinIO:", err);
    throw err; // Propagate error for higher level handling
  }
}

initializeMinio();

export default minioClient;
