// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config
// to keep this file tidy, we define our schema in a different file
import { config } from "@keystone-6/core";
// to keep this file tidy, we define our schema in a different file

import { session } from "./auth";
// import { extendExpressApp } from "./express-app";
import { lists } from "./schema";
// import { extendGraphqlSchema } from "./schema/extendGraphqlSchema";

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
// dotenv.config();
// eslint-disable-next-line max-len
// const dbUrl = process.env.POSTGRES_URL || `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.APP_NAME}-database-development:5432/${process.env.POSTGRES_DB}`;
// console.log(process.env.POSTGRES_URL);


export const keystoneConfig = config({
    db: {
        provider: "postgresql",
        url: "postgresql://eventure-web-user:test@eventure-web-app-database-development:5432/eventure-web",
        enableLogging: true,
        idField: { kind: "cuid" },
    },
    lists,
    //   extendGraphqlSchema,
    server: {
        // extendExpressApp,
        port: parseInt(process.env.SERVER_PORT ?? "") || 3001,
    },
    session,
    ui: {
        isAccessAllowed: () => true, //TODO, https://keystonejs.com/docs/walkthroughs/lesson-4#adding-init-first-item
    },
});
