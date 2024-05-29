const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  ACCESSTOKEN: "accesstoken",
  REFRESHTOKEN: "refreshtoken",
};

const PERMISSION = {
  ZERO: "0000",
  ONE: "1111",
  TWO: "2222",
};

const DISCOUNT_TYPES = {
  FIXED_AMOUNT: "fixed_amount",
  PERCENTAGE: "percentage",
  FREE_SHIPPING: "free_shipping",
  VOLUME: "volume",
  SEASONAL: "seasonal",
};
const DISCOUNT_APPLIES_TO = { ALL: "all", SPECIFIC: "specific" };
const CART_STATES = {
  ACTIVE: "active",
  COMPLETED: "completed",
  FAILED: "failed",
  PENDING: "pending",
};
export {
  RoleShop,
  HEADER,
  PERMISSION,
  DISCOUNT_TYPES,
  DISCOUNT_APPLIES_TO,
  CART_STATES,
};
