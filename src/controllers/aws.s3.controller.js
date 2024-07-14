import AWSS3Service from "../services/aws.s3.service.js";

const AWSS3Controller = {
  async uploadFile(req, res) {
    return res.fly({
      status: 200,
      message: "Upload to S3 successfuly",
      metadata: { fileUrl: await AWSS3Service.uploadFile(req.file) },
    });
  },
};

export default AWSS3Controller;
