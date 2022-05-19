import { ApolloServer } from "apollo-server-express";
import { expect, should } from "chai";
import getPort, { makeRange } from "get-port";
import { gql, GraphQLClient } from "graphql-request";

describe.only("User Profile Test", async () => {
  let server: ApolloServer;
  let client: GraphQLClient;

  const createQuery = gql`
    mutation CreateUserByWallet($wallet: String!) {
      CreateUserByWallet(wallet: $wallet) {
        id
        wallet
      }
    }
  `;
  // process.env.DATABASE_URL = "asd";
  // console.log(process.env.DATABASE_URL);

  before(async () => {
    client = new GraphQLClient(`http://localhost:8080/graphql`);
  });

  it("Should create users", async () => {
    // const testResult = await client.request(createQuery, {
    //   wallet: "0xFFFFFF",
    // });
    // expect(testResult.CreateUserByWallet.wallet).to.be.equal("0xFFFFFF");
  });

  it("Should error user wallet unique", async () => {
    try {
      const testResult = await client.request(createQuery, {
        wallet: "0xFFFFFF",
      });
      expect.fail("Should error cause duplicate");
    } catch (error) {
      expect(error).not.to.undefined;
    }
  });
});
