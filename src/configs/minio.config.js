import * as Minio from "minio";
import env from "./env.config.js";

const { endPoint, port, accessKey, secretKey, bucketName } = env.cloud.minio;
const minioClient = new Minio.Client({
  endPoint: endPoint,
  port: port,
  // region: env.db.aws.region,
  useSSL: false,
  accessKey: accessKey,
  secretKey: secretKey,
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

async function initializeMinio() {
  try {
    const bucketExists = await minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await minioClient.makeBucket(bucketName);
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
  } catch (err) {
    console.error("Error initializing MinIO:", err);
    throw err; // Propagate error for higher level handling
  }
  console.log("CONNECTED :: MINIO");
}

export { initializeMinio, minioClient };
