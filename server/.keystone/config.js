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
var import_core10 = require("@keystone-6/core");

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

// src/schema/Cleanup.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var Cleanup = (0, import_core.list)({
  access: import_access.allowAll,
  fields: {
    // fields unique to the cleanup table
    trashBags: (0, import_fields.checkbox)({
      defaultValue: false
    }),
    supplies: (0, import_fields.checkbox)({
      defaultValue: false
    }),
    recycle: (0, import_fields.checkbox)({
      defaultValue: false
    }),
    containers: (0, import_fields.checkbox)({
      defaultValue: false
    }),
    // relationships
    event: (0, import_fields.relationship)({
      ref: "Event.cleanup",
      many: false,
      db: { foreignKey: true }
    })
  }
});

// src/schema/Decoration.ts
var import_core2 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var Decoration = (0, import_core2.list)({
  access: import_access2.allowAll,
  fields: {
    // fields unique to the decoration table
    balloons: (0, import_fields2.checkbox)({
      defaultValue: false
    }),
    posters: (0, import_fields2.checkbox)({
      defaultValue: false
    }),
    tableDecorations: (0, import_fields2.checkbox)({
      defaultValue: false
    }),
    wallDecorations: (0, import_fields2.checkbox)({
      defaultValue: false
    }),
    lights: (0, import_fields2.checkbox)({
      defaultValue: false
    }),
    personalizedTouches: (0, import_fields2.text)({
      validation: { isRequired: false },
      db: { isNullable: true }
    }),
    // relationships
    event: (0, import_fields2.relationship)({
      ref: "Event.decorations",
      many: false,
      db: { foreignKey: true }
    })
  }
});

// src/schema/Entertainment.ts
var import_core3 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var Entertainment = (0, import_core3.list)({
  access: import_access3.allowAll,
  fields: {
    // fields unique to the entertainment table
    music: (0, import_fields3.checkbox)({
      defaultValue: false
    }),
    entertainers: (0, import_fields3.checkbox)({
      defaultValue: false
    }),
    activities: (0, import_fields3.checkbox)({
      defaultValue: false
    }),
    photobooth: (0, import_fields3.checkbox)({
      defaultValue: false
    }),
    prizes: (0, import_fields3.checkbox)({
      defaultValue: false
    }),
    // relationships
    event: (0, import_fields3.relationship)({
      ref: "Event.entertainment",
      many: false,
      db: { foreignKey: true }
    })
  }
});

// src/schema/Essential.ts
var import_core4 = require("@keystone-6/core");
var import_access4 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");
var Essential = (0, import_core4.list)({
  access: import_access4.allowAll,
  fields: {
    // fields unique to the supplies table
    utensils: (0, import_fields4.checkbox)({
      defaultValue: false
    }),
    cupsAndStraws: (0, import_fields4.checkbox)({
      defaultValue: false
    }),
    accessories: (0, import_fields4.checkbox)({
      defaultValue: false
    }),
    candles: (0, import_fields4.checkbox)({
      defaultValue: false
    }),
    cakeToppers: (0, import_fields4.checkbox)({
      defaultValue: false
    }),
    // relationships
    event: (0, import_fields4.relationship)({
      ref: "Event.essentials",
      many: false,
      db: { foreignKey: true }
    })
  }
});

// src/schema/Event.ts
var import_core5 = require("@keystone-6/core");
var import_access5 = require("@keystone-6/core/access");
var import_fields5 = require("@keystone-6/core/fields");
var Event = (0, import_core5.list)({
  access: import_access5.allowAll,
  fields: {
    // fields unique to the event table
    name: (0, import_fields5.text)({
      validation: { isRequired: true },
      db: { isNullable: false }
    }),
    type: (0, import_fields5.text)({
      validation: { isRequired: true },
      db: { isNullable: false }
    }),
    location: (0, import_fields5.text)({
      validation: { isRequired: false },
      db: { isNullable: true }
    }),
    date: (0, import_fields5.timestamp)({
      validation: { isRequired: true },
      db: { isNullable: false }
    }),
    // relationships
    user: (0, import_fields5.relationship)({
      ref: "User.events",
      many: false
    }),
    guests: (0, import_fields5.relationship)({
      ref: "Guest.event",
      many: true
    }),
    decorations: (0, import_fields5.relationship)({
      ref: "Decoration.event",
      many: false
    }),
    entertainment: (0, import_fields5.relationship)({
      ref: "Entertainment.event",
      many: false
    }),
    food: (0, import_fields5.relationship)({
      ref: "Food.event",
      many: false
    }),
    essentials: (0, import_fields5.relationship)({
      ref: "Essential.event",
      many: false
    }),
    favors: (0, import_fields5.relationship)({
      ref: "Favor.event",
      many: false
    }),
    cleanup: (0, import_fields5.relationship)({
      ref: "Cleanup.event",
      many: false
    })
  }
});

// src/schema/Favor.ts
var import_core6 = require("@keystone-6/core");
var import_access6 = require("@keystone-6/core/access");
var import_fields6 = require("@keystone-6/core/fields");
var Favor = (0, import_core6.list)({
  access: import_access6.allowAll,
  fields: {
    // fields unique to the favors table
    goodyBags: (0, import_fields6.checkbox)({
      defaultValue: false
    }),
    thankyouNote: (0, import_fields6.checkbox)({
      defaultValue: false
    }),
    // relationships
    event: (0, import_fields6.relationship)({
      ref: "Event.favors",
      many: false,
      db: { foreignKey: true }
    })
  }
});

// src/schema/Food.ts
var import_core7 = require("@keystone-6/core");
var import_access7 = require("@keystone-6/core/access");
var import_fields7 = require("@keystone-6/core/fields");
var Food = (0, import_core7.list)({
  access: import_access7.allowAll,
  fields: {
    // fields unique to the food table
    appetizers: (0, import_fields7.checkbox)({
      defaultValue: false
    }),
    mainCourse: (0, import_fields7.checkbox)({
      defaultValue: false
    }),
    beverages: (0, import_fields7.checkbox)({
      defaultValue: false
    }),
    dessert: (0, import_fields7.checkbox)({
      defaultValue: false
    }),
    cake: (0, import_fields7.checkbox)({
      defaultValue: false
    }),
    // relationships
    event: (0, import_fields7.relationship)({
      ref: "Event.food",
      many: false,
      db: { foreignKey: true }
    })
  }
});

// src/schema/Guest.ts
var import_core8 = require("@keystone-6/core");
var import_access8 = require("@keystone-6/core/access");
var import_fields8 = require("@keystone-6/core/fields");
var Guest = (0, import_core8.list)({
  access: import_access8.allowAll,
  fields: {
    // fields unique to the guest table
    name: (0, import_fields8.text)({
      validation: { isRequired: true },
      db: { isNullable: false }
    }),
    email: (0, import_fields8.text)({
      validation: { isRequired: true },
      db: { isNullable: false }
    }),
    phoneNumber: (0, import_fields8.text)({
      validation: { isRequired: true },
      db: { isNullable: false }
    }),
    // relationships
    event: (0, import_fields8.relationship)({
      ref: "Event.guests",
      many: false,
      db: { foreignKey: true }
    })
  }
});

// src/schema/User.ts
var import_core9 = require("@keystone-6/core");
var import_access9 = require("@keystone-6/core/access");
var import_fields9 = require("@keystone-6/core/fields");
var User = (0, import_core9.list)({
  access: import_access9.allowAll,
  fields: {
    // fields unique to the user table
    firstName: (0, import_fields9.text)({
      validation: { isRequired: false },
      db: { isNullable: true }
    }),
    lastName: (0, import_fields9.text)({
      validation: { isRequired: false },
      db: { isNullable: true }
    }),
    email: (0, import_fields9.text)({
      validation: { isRequired: true },
      db: { isNullable: false },
      isIndexed: "unique"
    }),
    country: (0, import_fields9.text)({
      validation: { isRequired: false },
      db: { isNullable: false }
    }),
    phoneNumber: (0, import_fields9.text)({
      db: { isNullable: false },
      validation: { isRequired: true }
    }),
    // relationships
    events: (0, import_fields9.relationship)({
      ref: "Event.user",
      many: true
    })
    // ssoId: text({
    //     validation: { isRequired: false },
    //     isIndexed: "unique",
    // }),
    // // "checkbox" is keystone's weird way of saying "boolean field"
    // admin: checkbox({
    //     defaultValue: false,
    // }),
  }
});

// src/schema/index.ts
var lists = {
  User,
  Event,
  Guest,
  Decoration,
  Entertainment,
  Food,
  Essential,
  Favor,
  Cleanup
};

// src/index.ts
var dbUrl = process.env.POSTGRES_URL_WITH_LOCALHOST || `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.APP_NAME}-database-development:5432/${process.env.POSTGRES_DB}`;
var keystoneConfig = (0, import_core10.config)({
  db: {
    provider: "postgresql",
    url: dbUrl,
    enableLogging: true,
    idField: { kind: "autoincrement" }
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
