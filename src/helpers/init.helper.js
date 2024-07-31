import { ROLE_NAMES } from "../configs/const.config.js";
import RBACService from "../services/rbac.service.js";
import APIKeyService from "../services/apikey.service.js";
import UserService from "../services/user.service.js";
import env from "../configs/env.config.js";
import { PERMISSION } from "../configs/const.config.js";
import _ from "lodash";

async function initRole() {
  const roles = [
    {
      rol_name: ROLE_NAMES.ADMIN,
      rol_slug: "r001",
      rol_description: "Admin app",
      rol_grants: [],
    },
    {
      rol_name: ROLE_NAMES.USER,
      rol_slug: "r002",
      rol_description: "User app",
      rol_grants: [],
    },
    {
      rol_name: ROLE_NAMES.SHOP,
      rol_slug: "r003",
      rol_description: "Shop app",
      rol_grants: [],
    },
  ];
  const rolesResult = await Promise.all(
    roles.map((role) => {
      return RBACService.newRole(role);
    })
  );
  if (
    _.chain(rolesResult)
      .filter((roleResult) => roleResult)
      .value().length
  ) {
    console.log(`Init :: Roles`);
  }
}
async function initAPIKey() {
  const apiKey = await APIKeyService.init({
    key: env.app.apiKey,
    permissions: [...Object.values(PERMISSION)],
  });
  if (apiKey) {
    console.log(`Init :: APIKey`);
  }
}
async function initAdmin() {
  const admin = await UserService.initAdmin(env.app.admin);
  if (admin) {
    console.log(`Init :: Admin`);
  }
}
async function initApp() {
  await initRole().catch(console.log);
  await initAPIKey().catch(console.log);
  await initAdmin().catch(console.log);
}

export default initApp;
