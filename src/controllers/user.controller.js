import UserService from "../services/user.service.js";
import JWTService from "../services/jwt.service.js";
import {
  googleToLocal,
  githubToLocal,
  clientAuthenURL,
} from "../utils/index.js";

const UserController = {
  email: {
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
      const [accessToken, refreshToken] = await Promise.all([
        JWTService.access.sign(user),
        JWTService.refresh.sign(user, user._id),
      ]);
      return res.redirect(clientAuthenURL(accessToken, refreshToken));
    },
    async beforeForgotPassword(req, res) {
      await UserService.beforeForgotPassword(req.body);
      return res.fly({
        status: 200,
        message:
          "Request forgot password successfully. Please check your email tc conform otp",
      });
    },
    async afterForgotPassword(req, res) {
      const user = await UserService.afterForgotPassword(req.body);
      const [access, refresh] = await Promise.all([
        JWTService.access.sign(user),
        JWTService.refresh.sign(user, user._id),
      ]);
      return res.fly({
        status: 200,
        message: "New password for forgot successfully",
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
      return res.redirect(clientAuthenURL(accessToken, refreshToken));
    },
    async gitHubCallback(req, res) {
      const user = await UserService.signUpFromSocial(githubToLocal(req.user));
      const [accessToken, refreshToken] = await Promise.all([
        JWTService.access.sign(user),
        JWTService.refresh.sign(user, user._id),
      ]);
      return res.redirect(clientAuthenURL(accessToken, refreshToken));
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
