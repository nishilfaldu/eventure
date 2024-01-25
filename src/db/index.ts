// import "dotenv/config";
import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";


// for query purposes - create the connection
const connection = connect({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_DEVELOP_USERNAME"],
  password: process.env["DATABASE_DEVELOP_PASSWORD"],
});

const db = drizzle(connection);

export { db };
