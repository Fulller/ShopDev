import AccessControl from "accesscontrol";
import RBACService from "../services/rbac.service.js";

let ac;

const initAccessControl = async () => {
  const listGrant = await RBACService.listGrant();
  ac = new AccessControl(listGrant);
  console.log("INIT :: ACCESSCONTROL");
};

const updateAccessControlGrants = async () => {
  const listGrant = await RBACService.listGrant();
  ac.setGrants(listGrant);
};

const getAccessControl = async () => {
  if (!ac) {
    throw new Error(
      "AccessControl has not been initialized. Call initAccessControl() first."
    );
  }
  const listGrant = await RBACService.listGrant();
  ac.setGrants(listGrant);
  return ac;
};
export { initAccessControl, getAccessControl, updateAccessControlGrants };
