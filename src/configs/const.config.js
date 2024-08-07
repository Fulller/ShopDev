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
const TEMPLATE_HTML_ID_1 =
  '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Email Verification</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            background-color: #f4f4f4;\n            margin: 0;\n            padding: 0;\n        }\n        .container {\n            max-width: 600px;\n            margin: 20px auto;\n            background-color: #ffffff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n        }\n        .header {\n            text-align: center;\n            padding: 10px 0;\n        }\n        .header h1 {\n            margin: 0;\n            font-size: 24px;\n            color: #333333;\n        }\n        .content {\n            padding: 20px 0;\n            text-align: center;\n        }\n        .content p {\n            font-size: 18px;\n            color: #666666;\n        }\n        .content a {\n            display: inline-block;\n            margin-top: 20px;\n            padding: 10px 20px;\n            background-color: #007bff;\n            color: #ffffff;\n            text-decoration: none;\n            border-radius: 4px;\n        }\n        .footer {\n            text-align: center;\n            padding: 10px 0;\n            font-size: 14px;\n            color: #999999;\n        }\n    </style>\n</head>\n<body>\n    <div class="container">\n        <div class="header">\n            <h1>Email Verification</h1>\n        </div>\n        <div class="content">\n            <p>Click the button below to verify your email address:</p>\n            <a href="{{verify_link}}">Verify Email</a>\n            <p>If you did not request this email, please ignore it.</p>\n        </div>\n        <div class="footer">\n            <p>&copy; 2024 Your Company. All rights reserved.</p>\n        </div>\n    </div>\n</body>\n</html>';
const TEMPLATE_HTML_ID_2 =
  '<!DOCTYPE html> <html> <head>     <meta charset="UTF-8">   <title>Welcome to Our Service</title> </head> <body>    <h1>Welcome to Our Service</h1>    <p>Chào mừng đến với service của chúng tôi, mật khẩu mặc định của bạn là: <strong>{{default_password}}</strong></p></body></html>';
const TEMPLATE_HTML_ID_3 =
  '<!DOCTYPE html> <html> <head>     <meta charset="UTF-8">   <title>For got password otp</title> </head> <body>    <h1>Welcome to Our Service</h1>    <p>OTP xác nhận quên mật khẩu: <strong>{{forgot_password_otp}}</strong></p></body></html>';

const STORAGE_PATH = {
  S3: "/storage/s3",
  CLOUDINARY: "/storage/cloudinary",
};
const PROXY_PATH = {
  S3: "https://{{bucketName}}.s3.{{region}}.amazonaws.com",
  CLOUDINARY: "https://res.cloudinary.com",
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
  TEMPLATE_HTML_ID_1,
  TEMPLATE_HTML_ID_2,
  TEMPLATE_HTML_ID_3,
  STORAGE_PATH,
  PROXY_PATH,
};
