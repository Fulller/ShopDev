import MinioService from "../services/minio.service.js";
import _ from "lodash";

const UploadController = {
  uploadFile: async function (req, res) {
    const file = req.file;
    const fileUrl = await MinioService.uploadFile(file);
    res.fly({ status: 200, metadata: { fileUrl } });
  },
  deleteFile: async function (req, res) {
    const fileUrl = req.query.file_url || req.body.file_url;
    await MinioService.deleteFile(fileUrl);
    res.fly({
      status: 200,
      message: `Deleted file ${fileUrl} successfuly`,
      metadata: { fileUrl },
    });
  },
};

export default UploadController;
