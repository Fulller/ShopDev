import SPU from "../models/spu.model.js";

const SPUService = {
  async create(data) {
    return SPU.create(data);
  },
  async get(_id) {
    return SPU.findById(_id);
  },
};
export default SPUService;
