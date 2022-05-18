import express from "express";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { context } from "./context";

import { schema } from "./schema";

const startServer = async () => {
  const server = new ApolloServer({
    schema,
    context,
  });
  await server.start();

  const app = express();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  const port = 8080;
  // const url = await new Promise<void>((url) => app.listen({ port }, url));
  await new Promise<void>((r) => app.listen({ port }, r));

  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
};

startServer();
