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

const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  SHIPPED: "shipped",
  CANCELLED: "cancelled",
  DELIVERED: "delivered",
};
const NOTI_TYPES = {
  ORDER_001: "ORDER-001",
  ORDER_002: "ORDER-002",
  PROMOTION_001: "PROMOTION-001",
  SHOP_001: "SHOP-001",
};
const USER_STATUS = {
  PENDING: "peding",
  ACTIVE: "active",
  BLOCK: "block",
};
const ROLE_NAMES = { USER: "user", SHOP: "shop", ADMIN: "admin" };
const ROLE_STATUS = {
  PENDING: "peding",
  ACTIVE: "active",
  BLOCK: "block",
};
const ROLE_POSSESSIONS = {
  ANY: "any",
  OWN: "own",
};
const ROLE_ACTIONS = {
  CREATE: "create",
  READ: "read",
  UPDATE: "update",
  DELETE: "delete",
};
const OTP_STATUS = {
  PENDING: "peding",
  ACTIVE: "active",
  BLOCK: "block",
};
const TEMPLATE_STATUS = {
  PENDING: "peding",
  ACTIVE: "active",
  BLOCK: "block",
};
export {
  RoleShop,
  HEADER,
  PERMISSION,
  DISCOUNT_TYPES,
  DISCOUNT_APPLIES_TO,
  CART_STATES,
  ORDER_STATUS,
  NOTI_TYPES,
  USER_STATUS,
  ROLE_NAMES,
  ROLE_STATUS,
  ROLE_POSSESSIONS,
  ROLE_ACTIONS,
  OTP_STATUS,
  TEMPLATE_STATUS,
};
