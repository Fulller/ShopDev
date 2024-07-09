import { v2 as cloudinary } from "cloudinary";
import { extractPublicId } from "cloudinary-build-url";
import { convertToSlug } from "../utils/index.js";
import _ from "lodash";
import createHttpError from "http-errors";
import env from "../configs/env.config.js";

const folder = env.cloudinary.folder;

const CloudinaryService = {
  uploadImage: async function (imageFile) {
    const imageBuffer = imageFile.buffer;
    try {
      if (!imageBuffer || !Buffer.isBuffer(imageBuffer)) {
        throw createHttpError(400, "Invalid image buffer");
      }
      const originalFilename = imageFile.originalname;
      const publicId = convertToSlug(originalFilename.split(".")[0]);
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: folder,
              use_filename: true,
              public_id: publicId,
              unique_filename: false,
            },
            (error, result) => {
              if (error) {
                reject(createHttpError(error));
              } else {
                resolve(result);
              }
            }
          )
          .end(imageBuffer);
      });
    } catch (err) {
      throw createHttpError(err);
    }
  },
  deleteImage: async function (imageUrl) {
    try {
      const publicId = extractPublicId(imageUrl);
      if (!publicId) {
        throw createHttpError(400, "Public ID is required");
      }
      return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
          if (error) {
            reject(createHttpError(error));
          } else {
            resolve(result);
          }
        });
      });
    } catch (err) {
      throw createHttpError(err);
    }
  },
};

export default CloudinaryService;
