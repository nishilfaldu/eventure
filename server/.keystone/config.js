"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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

// src/schema/User.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var UserTable = (0, import_core.list)({
  access: import_access.allowAll,
  fields: {
    firstName: (0, import_fields.text)({
      validation: { isRequired: false },
      db: { isNullable: true }
    }),
    lastName: (0, import_fields.text)({
      validation: { isRequired: false },
      db: { isNullable: true }
    }),
    email: (0, import_fields.text)({
      validation: { isRequired: true },
      db: { isNullable: false },
      isIndexed: "unique"
    }),
    country: (0, import_fields.text)({
      validation: { isRequired: false },
      db: { isNullable: false }
    }),
    phoneNumber: (0, import_fields.text)({
      db: { isNullable: false },
      validation: { isRequired: true }
    })
    // ssoId: text({
    //     validation: { isRequired: false },
    //     isIndexed: "unique",
    // }),
    // // "checkbox" is keystone's weird way of saying "boolean field"
    // admin: checkbox({
    //     defaultValue: false,
    // }),
    // events: relationship({
    //     ref: "Event",
    // }),
  }
});

// src/schema/index.ts
var lists = {
  User: UserTable
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
    // extendExpressApp,
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
