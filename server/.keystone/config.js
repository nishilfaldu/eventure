"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);

// src/index.ts
var import_core2 = require("@keystone-6/core");

// src/auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// src/express-app/api/index.ts
var import_express2 = require("express");

// src/express-app/api/user.ts
var import_body_parser = __toESM(require("body-parser"));
var import_express = require("express");
var import_svix = require("svix");
var userRouter = (0, import_express.Router)();
userRouter.post("/webhook", import_body_parser.default.raw({ type: "application/json" }), async function(req, res) {
  try {
    const payloadString = req.body.toString();
    const svixHeaders = req.headers;
    if (!process.env.CLERK_WEBHOOK_SECRET_KEY) {
      res.status(400).json({
        success: false,
        message: "Clerk Webhook Secret Key not found"
      });
      return;
    }
    const wh = new import_svix.Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
    const evt = wh.verify(payloadString, svixHeaders);
    const { id } = evt.data;
    const eventType = evt.type;
    if (eventType === "user.created") {
      console.log(`User ${id} was ${eventType}`);
    }
    res.status(200).json({
      success: true,
      message: "Webhook received"
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

// src/express-app/api/index.ts
var apiRouter = (0, import_express2.Router)();
apiRouter.use("/", userRouter);

// src/express-app/utils.ts
function makeContextMiddleware(context) {
  const middleware = async (req, _, next) => {
    req.context = await context.withRequest(req);
    next();
  };
  return middleware;
}

// src/express-app/index.ts
function extendExpressApp(app, context) {
  app.use(makeContextMiddleware(context));
  app.use("/api", apiRouter);
}

// src/schema/index.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var lists = {
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      ssoId: (0, import_fields.text)({
        validation: { isRequired: false },
        isIndexed: "unique"
      }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      // "checkbox" is keystone's weird way of saying "boolean field"
      admin: (0, import_fields.checkbox)({
        defaultValue: false
      })
    }
  })
};

// src/index.ts
var dbUrl = process.env.POSTGRES_URL_WITH_LOCALHOST || `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.APP_NAME}-database-development:5432/${process.env.POSTGRES_DB}`;
var keystoneConfig = (0, import_core2.config)({
  db: {
    provider: "postgresql",
    url: dbUrl,
    enableLogging: true,
    idField: { kind: "cuid" }
  },
  lists,
  //   extendGraphqlSchema,
  server: {
    extendExpressApp,
    port: parseInt(process.env.SERVER_PORT ?? "") || 3001
  },
  session,
  ui: {
    isAccessAllowed: () => true
    //TODO, https://keystonejs.com/docs/walkthroughs/lesson-4#adding-init-first-item
  }
});

// keystone.ts
var keystone_default = keystoneConfig;
//# sourceMappingURL=config.js.map
