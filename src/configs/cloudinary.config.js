import { v2 as cloudinary } from "cloudinary";
import { STORAGE_PATH, PROXY_PATH } from "./const.config.js";
import { createProxyMiddleware } from "http-proxy-middleware";
import env from "./env.config.js";

const configureCloudinary = () => {
  cloudinary.config(env.cloud.cloudinary);
  console.log("CONFIGURED ::  CLOUDINARY");
};
async function configureProxyCloudinary(app) {
  const target = PROXY_PATH.CLOUDINARY;
  https: app.use(
    STORAGE_PATH.CLOUDINARY,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^${STORAGE_PATH.CLOUDINARY}`]: "",
      },
    })
  );
  console.log("CONFIGURED ::  PROXY :: CLOUDINARY");
}
export { cloudinary, configureCloudinary, configureProxyCloudinary };
