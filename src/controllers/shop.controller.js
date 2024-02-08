import { ShopService, JWTService } from "../services/index.js";
import { HEADER } from "../configs/const.config.js";
import _ from "lodash";

const ShopController = {
  async signUp(req, res) {
    const shopData = _.pick(req.body, ["email", "name", "password"]);
    const shop = await ShopService.signUp(shopData);
    const [access, refresh] = await Promise.all([
      JWTService.access.sign(shop),
      JWTService.refresh.sign(shop, shop._id),
    ]);
    return res.fly({
      status: 200,
      message: "Register shop successfuly",
      metadata: { shop, tokens: { access, refresh } },
    });
  },
  async logIn(req, res) {
    const shopData = _.pick(req.body, ["email", "password"]);
    const shop = await ShopService.logIn(shopData);
    const [access, refresh] = await Promise.all([
      JWTService.access.sign(shop),
      JWTService.refresh.sign(shop, shop._id),
    ]);
    return res.fly({
      status: 200,
      message: "Log-in shop successfuly",
      metadata: { shop, tokens: { access, refresh } },
    });
  },
  async logOut(req, res) {
    const refreshToken = req.headers[HEADER.REFRESHTOKEN];
    await JWTService.refresh.delete(refreshToken);
    res.fly({ status: 200, message: "Log out successfuly" });
  },
  async refreshToken(req, res) {
    const refreshToken = req.headers[HEADER.REFRESHTOKEN];
    const accessToken = await JWTService.refreshToken(refreshToken);
    res.fly({
      status: 200,
      message: "Refresh token successfuly",
      metadata: { accessToken },
    });
  },
};

export default ShopController;
