import "reflect-metadata"
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { Post } from "./entities/post";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const posts = await orm.em.find(Post, {})
  console.log(posts)

  const app = express();
  app.get("/", (_, res) => {
    res.send("hello");
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({
      em: orm.em,
    }),
  });

  apolloServer.applyMiddleware({
    app,
  });

  app.listen(4000, () => {
    console.log("Server started");
  });
}

main().catch((err) => {
  console.error(err);
});
