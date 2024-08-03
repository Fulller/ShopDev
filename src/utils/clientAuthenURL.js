import env from "../configs/env.config.js";

function clientAuthenURL(accessToken, refreshToken) {
  return `${env.auth.clientUrl}/auth?accesstoken=${accessToken}&refreshtoken=${refreshToken}`;
}
export default clientAuthenURL;
