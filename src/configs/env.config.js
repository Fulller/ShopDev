import dotenv from "dotenv";
import _ from "lodash";
dotenv.config();

const NODE_ENV = _.get(process.env, "NODE_ENV", "DEV");
function getEnvValue(name, defaultValue = "") {
  const env = process.env;
  return _.get(env, NODE_ENV + "_" + name) || defaultValue;
}
const env = {
  app: {
    port: getEnvValue("APP_PORT", 8000),
    sessionSecret: getEnvValue("APP_SESSTIONSECRET", "OurFormSECRET"),
    serverUrl: getEnvValue("APP_SERVERURL", "http://localhost:8000"),
    alwaysLive: getEnvValue("APP_ALWAYSLIVE", 1),
    limitUpload: _.toNumber(getEnvValue("APP_LIMITUPLOAD", "100")), // MB
  },
  db: {
    mongodb: getEnvValue("DB_MONGODB", "mongodb://localhost:27017/ShopDev"),
    redis: getEnvValue("DB_REDIS", "redis://@127.0.0.1:6379"),
  },
  auth: {
    google: {
      clientID: getEnvValue(
        "AUTH_GOOGLE_CLIENTID",
        "609768689359-fcd9ft4sj5v6tndo7vcft164g4f85nvv.apps.googleusercontent.com"
      ),
      clientSecret: getEnvValue(
        "AUTH_GOOGLE_CLIENTSECRET",
        "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"
      ),
    },
    clientUrl: getEnvValue("AUTH_CLIENTURL", "http://localhost:3000"),
    jwt: {
      access_serect_key: getEnvValue("AUTH_JWT_ACCESS_SECRECT_KEY", "ACCESS"),
      refresh_serect_key: getEnvValue(
        "AUTH_JWT_REFRESH_SECRECT_KEY",
        "REFRESH"
      ),
      access_ex: _.toNumber(getEnvValue("AUTH_JWT_ACCESS_EX", "3600")),
      refresh_ex: _.toNumber(getEnvValue("AUTH_JWT_REFRESH_EX", "7200")),
    },
  },
  cloud: {
    minio: {
      endPoint: getEnvValue("CLOUD_MINIO_ENDPOINT", "localhost"),
      port: _.toNumber(getEnvValue("CLOUD_MINIO_PORT", "9000")),
      accessKey: getEnvValue("CLOUD_MINIO_ACCESSKEY", "MINIO_ACCESS_KEY"),
      secretKey: getEnvValue("CLOUD_MINIO_SECRETKEY", "MINIO_SECRET_KEY"),
      bucketName: getEnvValue("CLOUD_MINIO_BUCKETNAME", "shopdev"),
    },
    cloudinary: {
      cloud_name: getEnvValue("CLOUD_CLOUDINARY_CLOUD_NAME"),
      api_key: getEnvValue("CLOUD_CLOUDINARY_API_KEY"),
      api_secret: getEnvValue("CLOUD_CLOUDINARY_API_SECRET"),
      folder: getEnvValue("CLOUD_CLOUDINARY_FOLDER", "shop_dev"),
    },
    s3: {
      accessKeyId: getEnvValue("CLOUD_S3_ACCESSKEYID"),
      secretAccessKey: getEnvValue("CLOUD_S3_SECRETACCESSKEY"),
      region: getEnvValue("CLOUD_S3_REGION", "ap-southeast-1"),
      bucketName: getEnvValue(
        "CLOUD_S3_BUCKETNAME",
        "prokenpromiseboy-bucket-shopdev"
      ),
    },
    ses: {
      region: getEnvValue("CLOUD_SES_REGION", "ap-southeast-1"),
      credentials: {
        accessKeyId: getEnvValue("CLOUD_SES_ACCESSKEYID"),
        secretAccessKey: getEnvValue("CLOUD_SES_SECRETACCESSKEY"),
      },
    },
    mailer: {
      host: getEnvValue("CLOUD_EMAIL_HOST"),
      port: getEnvValue("CLOUD_EMAIL_PORT"),
      secure: getEnvValue("CLOUD_EMAIL_SECURE", "false") == "true",
      auth:
        getEnvValue("CLOUD_EMAIL_USER") && getEnvValue("CLOUD_EMAIL_PASSWORD")
          ? {
              user: getEnvValue("CLOUD_EMAIL_USER"),
              pass: getEnvValue("CLOUD_EMAIL_PASSWORD"),
            }
          : null,
    },
  },
};
export default env;
