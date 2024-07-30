import UserService from "../services/user.service.js";

const UserController = {
  async signUp(req, res) {
    return res.fly({
      status: 200,
      message: "Request sign up successfull. Please check your email",
      metadata: await UserService.signUp(req.body),
    });
  },
};

export default UserController;
