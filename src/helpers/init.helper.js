import { ROLE_NAMES } from "../configs/const.config.js";
import RBACService from "../services/rbac.service.js";

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
  console.log({ rolesResult });
}

await initRole();
