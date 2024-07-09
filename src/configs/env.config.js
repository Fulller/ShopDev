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
    minio: {
      endPoint: getEnvValue("DB_MINIO_ENDPOINT", "localhost"),
      port: _.toNumber(getEnvValue("DB_MINIO_PORT", "9000")),
      accessKey: getEnvValue("DB_MINIO_ACCESSKEY", "MINIO_ACCESS_KEY"),
      secretKey: getEnvValue("DB_MINIO_SECRETKEY", "MINIO_SECRET_KEY"),
      bucketName: getEnvValue("DB_MINIO_BUCKETNAME", "shopdev"),
    },
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
  },
  jwt: {
    access_serect_key: getEnvValue("JWT_ACCESS_SECRECT_KEY", "ACCESS"),
    refresh_serect_key: getEnvValue("JWT_REFRESH_SECRECT_KEY", "REFRESH"),
    access_ex: _.toNumber(getEnvValue("JWT_ACCESS_EX", "3600")),
    refresh_ex: _.toNumber(getEnvValue("JWT_REFRESH_EX", "7200")),
  },
  cloudinary: {
    cloud_name: getEnvValue("CLOUDINARY_CLOUD_NAME"),
    api_key: getEnvValue("CLOUDINARY_API_KEY"),
    api_secret: getEnvValue("CLOUDINARY_API_SECRET"),
    folder: getEnvValue("CLOUDINARY_FOLDER", "shop_dev"),
  },
};
export default env;
