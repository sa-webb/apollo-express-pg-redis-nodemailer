import "./config/env";
import path from "path";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";

import { Post } from "./entities/post";
import { User } from "./entities/User";

export default {
  dbName: process.env.DB_NAME,
  type: process.env.TYPE,
  user: process.env.USER,
  password: process.env.PASSSWORD,
  debug: !__prod__,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
} as Parameters<typeof MikroORM.init>[0];
