import UserService from "../services/user.service.js";
import JWTService from "../services/jwt.service.js";

const UserController = {
  async signUp(req, res) {
    return res.fly({
      status: 200,
      message: "Request sign up successfull. Please check your email",
      metadata: await UserService.signUp(req.body),
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
};

export default UserController;
