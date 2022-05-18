import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  //@ts-ignore
  link: createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  }),
});

export default client;
