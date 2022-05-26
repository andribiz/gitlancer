import express from "express";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { context } from "./context";

import { schema } from "./schema";

export const startServer = async (
  portNumber: number | string | undefined | null
) => {
  const server = new ApolloServer({
    schema,
    context,
  });
  await server.start();

  const app = express();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  const port = portNumber || 8080;
  await new Promise<void>((r) => app.listen({ port }, r));

  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
  return server;
};
