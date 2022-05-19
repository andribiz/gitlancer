import { ApolloServer } from "apollo-server-express";
import { expect, should } from "chai";
import getPort, { makeRange } from "get-port";
import { gql, GraphQLClient } from "graphql-request";

describe.only("Jobs Data Test", async () => {
  // let server: ApolloServer;
  // let client: GraphQLClient;

  // const createQuery = gql`
  //   mutation CreateUserByWallet($wallet: String!) {
  //     CreateUserByWallet(wallet: $wallet) {
  //       id
  //       wallet
  //     }
  //   }
  // `;
  // process.env.DATABASE_URL = "asd";
  // console.log(process.env.DATABASE_URL);

  before(async () => {
    // const port = await getPort({ port: makeRange(4000, 6000) });
    // server = await startServer(port);
    // client = new GraphQLClient(`http://localhost:${port}/graphql`);
  });

  after(async () => {
    // await server.stop();
  });

  it("Should create users", async () => {
    // const testResult = await client.request(createQuery, {
    //   wallet: "0xFFFFFF",
    // });

    // expect(testResult.CreateUserByWallet.wallet).to.be.equal("0xFFFFFF");
    console.log("HALO TEST");
  });
});
