import { Shop } from "../models/index.js";
import { pickAccountData } from "../utils/index.js";
import { RoleShop } from "../configs/const.config.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

const ShopService = {
  async signUp({ name, email, password }) {
    const holderShop = await Shop.findOne({ email }).lean();
    if (holderShop) {
      throw createHttpError(400, "Shop already registered!");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newShop = await Shop.create({
      name,
      email,
      password: passwordHash,
      roles: [RoleShop.SHOP],
    });
    return pickAccountData(newShop);
  },
  async logIn({ email, password }) {
    const shop = await Shop.findOne({ email }).lean();
    if (!shop) {
      throw createHttpError(401, "Invalid email");
    }
    const result = await bcrypt.compare(password, shop.password);
    if (!result) {
      throw createHttpError(401, "Invalid password");
    }
    return pickAccountData(shop);
  },
};

export default ShopService;
