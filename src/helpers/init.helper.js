import RBACService from "../services/rbac.service.js";
import APIKeyService from "../services/apikey.service.js";
import UserService from "../services/user.service.js";
import TemplateService from "../services/template.service.js";
import {
  ROLE_NAMES,
  PERMISSION,
  TEMPLATE_HTML_ID_1,
  TEMPLATE_HTML_ID_2,
  TEMPLATE_HTML_ID_3,
} from "../configs/const.config.js";
import env from "../configs/env.config.js";
import _ from "lodash";

async function getRBACResourceId() {
  const resourceName = "rbac";
  let rbacResource = await RBACService.findByName(resourceName);
  if (rbacResource) {
    return rbacResource._id;
  }
  rbacResource = await RBACService.newResource({
    src_name: resourceName,
    src_description: "RBAC resource",
    src_slug: resourceName,
  });
  return rbacResource._id;
}
async function initRole() {
  const rbacResouceId = await getRBACResourceId();
  const roles = [
    {
      rol_name: ROLE_NAMES.ADMIN,
      rol_slug: "r001",
      rol_description: "Admin app",
      rol_grants: [
        {
          resource: rbacResouceId,
          action: "create",
          possession: "any",
          attribute: "*",
        },
        {
          resource: rbacResouceId,
          action: "update",
          possession: "any",
          attribute: "*",
        },
        {
          resource: rbacResouceId,
          action: "read",
          possession: "any",
          attribute: "*",
        },
        {
          resource: rbacResouceId,
          action: "delete",
          possession: "any",
          attribute: "*",
        },
      ],
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
    console.log(`INIT :: ROLES`);
  }
}
async function initAdmin() {
  const admin = await UserService.initAdmin(env.app.admin);
  if (admin) {
    console.log(`INIT :: ADMIN`);
  }
}
async function initAPIKey() {
  const apiKey = await APIKeyService.init({
    key: env.app.apiKey,
    permissions: [...Object.values(PERMISSION)],
  });
  if (apiKey) {
    console.log(`INIT :: API_KEY`);
  }
}
async function initTemEmaiHTMLID() {
  try {
    const templates = [
      {
        tem_id: 1,
        tem_name: "HTML SEND MAIL VERIFY LINK",
        tem_html: TEMPLATE_HTML_ID_1,
      },
      {
        tem_id: 2,
        tem_name: "HTML SEND MAIL WELCOME WITH DEFAULT PASSWORD",
        tem_html: TEMPLATE_HTML_ID_2,
      },
      {
        tem_id: 3,
        tem_name: "HTML SEND MAIL FORGOT PASSWORD OTP",
        tem_html: TEMPLATE_HTML_ID_3,
      },
    ];
    await Promise.all(
      templates.map((template) => TemplateService.add(template))
    );
    console.log("INIT :: TEM_HTML");
  } catch {}
}
async function initApp() {
  try {
    await initRole();
    await Promise.all([initAPIKey(), initAdmin(), initTemEmaiHTMLID()]);
  } catch (err) {
    console.log(err);
  }
}

export default initApp;
