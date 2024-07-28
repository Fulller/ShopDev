import jwt from "jsonwebtoken";
import env from "../configs/env.config.js";
import createHttpError from "http-errors";
import { Token } from "../models/index.js";
import { pickAccountData } from "../utils/index.js";
import _ from "lodash";

const {
  access_serect_key: ACCESS_SECRECT_KEY,
  refresh_serect_key: REFRESH_SECRECT_KEY,
  access_ex: ACCESS_EX,
  refresh_ex: REFRESH_EX,
} = env.auth.jwt;

const JWTService = {
  access: {
    sign: (payload) => {
      return jwt.sign(pickAccountData(payload), ACCESS_SECRECT_KEY, {
        expiresIn: ACCESS_EX,
        algorithm: "HS256",
      });
    },
    verify: (token) => {
      return jwt.verify(token, ACCESS_SECRECT_KEY);
    },
  },
  refresh: {
    sign: async (payload, user) => {
      const token = jwt.sign(pickAccountData(payload), REFRESH_SECRECT_KEY, {
        expiresIn: REFRESH_EX,
        algorithm: "HS256",
      });
      const expiresAt = new Date(Date.now() + REFRESH_EX * 1000);
      await Token.findOneAndUpdate(
        { user },
        {
          user,
          token,
          expiresAt,
        },
        { upsert: true }
      );
      return token;
    },
    verify: async (token) => {
      try {
        const payload = await jwt.verify(token, REFRESH_SECRECT_KEY);
        const storedRefreshToken = await Token.findOne({
          user: payload._id,
          token,
        });
        if (!storedRefreshToken || storedRefreshToken.expiresAt < new Date()) {
          return null;
        }
        return payload;
      } catch {
        return null;
      }
    },
    delete: async (token) => {
      const payload = await JWTService.refresh.verify(token);
      if (!payload) throw createHttpError(400, "Token invalid");
      return await Token.deleteOne({ user: payload._id });
    },
    findByUser: async (user) => {
      return await Token.findOne({ user }).lean();
    },
  },
  refreshToken: async function (refreshTokenString) {
    const validRefreshToken = await JWTService.refresh.verify(
      refreshTokenString
    );
    if (!validRefreshToken) {
      throw createHttpError(403, "RefreshToken invalid");
    }
    const accessToken = await JWTService.access.sign(
      pickAccountData(validRefreshToken)
    );
    if (!accessToken) {
      throw createHttpError(403, "Can not create access token");
    }
    return accessToken;
  },
};

export default JWTService;
