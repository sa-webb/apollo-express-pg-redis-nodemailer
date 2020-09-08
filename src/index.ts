import "reflect-metadata";
import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import cors from "cors";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { __prod__, COOKIE_NAME } from "./constants";

import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { AccountResolver } from "./resolvers/account";

import { createConnection } from "typeorm";
import { Account } from "./entities/Account";
import { Post } from "./entities/post";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: process.env.DB_NAME,
    username: process.env.USER,
    password: process.env.PASSWORD,
    host: "localhost",
    port: 5432,
    synchronize: true,
    logging: true,
    entities: [Account, Post],
  });

  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      secret: "ligftrdrtdfkyg",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
      },
    })
  );

  app.get("/", (_, res) => {
    res.send("hello");
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, AccountResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("Server started");
  });
};

main().catch((err) => {
  console.error(err);
});
