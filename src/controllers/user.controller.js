import UserService from "../services/user.service.js";
import JWTService from "../services/jwt.service.js";
import { googleToLocal, githubToLocal } from "../utils/index.js";
import env from "../configs/env.config.js";

const UserController = {
  local: {
    async signUp(req, res) {
      return res.fly({
        status: 200,
        message: "Request sign up successfull. Please check your email",
        metadata: await UserService.signUp(req.body),
      });
    },
    async logIn(req, res) {
      const user = await UserService.logIn(req.body);
      const [access, refresh] = await Promise.all([
        JWTService.access.sign(user),
        JWTService.refresh.sign(user, user._id),
      ]);
      return res.fly({
        status: 200,
        message: "Log in succesfully",
        metadata: { user, tokens: { access, refresh } },
      });
    },
    async verifySignUpOTP(req, res) {
      const user = await UserService.verifySignUpOTP(req.query);
      const [access, refresh] = await Promise.all([
        JWTService.access.sign(user),
        JWTService.refresh.sign(user, user._id),
      ]);
      return res.fly({
        status: 200,
        message: "Verify OTP successfully",
        metadata: { user, tokens: { access, refresh } },
      });
    },
  },
  social: {
    async googleCallback(req, res) {
      const user = await UserService.signUpFromSocial(googleToLocal(req.user));
      const [accessToken, refreshToken] = await Promise.all([
        JWTService.access.sign(user),
        JWTService.refresh.sign(user, user._id),
      ]);
      return res.redirect(
        `${env.auth.clientUrl}/auth?accesstoken=${accessToken}&refreshtoken=${refreshToken}`
      );
    },
    async gitHubCallback(req, res) {
      const user = await UserService.signUpFromSocial(githubToLocal(req.user));
      const [accessToken, refreshToken] = await Promise.all([
        JWTService.access.sign(user),
        JWTService.refresh.sign(user, user._id),
      ]);
      return res.redirect(
        `${env.auth.clientUrl}/auth?accesstoken=${accessToken}&refreshtoken=${refreshToken}`
      );
    },
  },
  async profile(req, res) {
    return res.fly({
      status: 200,
      message: "Get profile successfully",
      metadata: req.user,
    });
  },
};

export default UserController;
