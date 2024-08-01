import CloudinaryService from "../services/cloudinary.service.js";
import _ from "lodash";

const CloudinaryController = {
  uploadImage: async function (req, res) {
    const imageFile = _.get(req, "file", null);
    return res.fly({
      status: 200,
      metadata: { imageUrl: await CloudinaryService.uploadImage(imageFile) },
    });
  },
  deleteImage: async function (req, res) {
    const imageUrl = req.query.imageUrl || req.body.imageUrl;
    const result = await CloudinaryService.deleteImage(imageUrl);
    return res.fly({
      status: 200,
      message: "Delete image successfuly",
      metadata: result,
    });
  },
};
export default CloudinaryController;
