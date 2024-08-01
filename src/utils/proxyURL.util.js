import { STORAGE_PATH, PROXY_PATH } from "../configs/const.config.js";

function cloudinaryToServer({ serverUrl, ogirinalURL }) {
  const urlSplit = ogirinalURL.split("res.cloudinary.com");
  return `${serverUrl}${STORAGE_PATH.CLOUDINARY}${urlSplit[1]}`;
}
function serverToCloudinary(url) {
  const splitedUrl = url.split(STORAGE_PATH.CLOUDINARY);
  return `${PROXY_PATH.CLOUDINARY}${splitedUrl[1]}`;
}
function s3ToServer({ serverUrl, storagePath, fileName }) {
  return `${serverUrl}${storagePath}/${fileName}`;
}

export { cloudinaryToServer, s3ToServer, serverToCloudinary };
