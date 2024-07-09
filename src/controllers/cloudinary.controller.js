import CloudinaryService from "../services/cloudinary.service.js";
import _ from "lodash";

const CloudinaryController = {
  uploadImage: async function (req, res) {
    const imageFile = _.get(req, "file", null);
    const { url } = await CloudinaryService.uploadImage(imageFile);
    return res.fly({ status: 200, metadata: { imageUrl: url } });
  },
  deleteImage: async function (req, res) {
    const imageUrl = req.query.image_url || req.body.image_url;
    const result = await CloudinaryService.deleteImage(imageUrl);
    return res.fly({
      status: 200,
      message: "Delete image successfuly",
      metadata: result,
    });
  },
};
export default CloudinaryController;
