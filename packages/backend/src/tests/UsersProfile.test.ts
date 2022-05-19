import { ApolloServer } from "apollo-server-express";
import { expect } from "chai";
import { gql, GraphQLClient } from "graphql-request";

describe.only("User Profile Test", async () => {
  let client: GraphQLClient;
  let id: string;
  const wallet = "0xFFFFFF";

  const createQuery = gql`
    mutation CreateUserByWallet($wallet: String!) {
      CreateUserByWallet(wallet: $wallet) {
        id
        wallet
      }
    }
  `;

  const getUserByWalletQuery = gql`
    query GetUserByWallet($wallet: String!) {
      GetUserByWallet(wallet: $wallet) {
        id
        name
        wallet
        email
      }
    }
  `;

  const getUserByIDQuery = gql`
    query GetUserByID($id: String!) {
      GetUserByID(id: $id) {
        id
        name
        wallet
        email
      }
    }
  `;

  const updateUserByID = gql`
    mutation UpdateUserProfile($id: String!, $input: UsersProfileInput!) {
      UpdateUserProfile(id: $id, input: $input) {
        id
        name
        wallet
        email
      }
    }
  `;

  before(async () => {
    client = new GraphQLClient(`http://localhost:8080/graphql`);
  });

  it("Should create users", async () => {
    const testResult = await client.request(createQuery, {
      wallet,
    });
    expect(testResult.CreateUserByWallet.wallet).to.be.equal(wallet);
    id = testResult.CreateUserByWallet.id;
  });

  it("Should error user wallet unique", async () => {
    try {
      const testResult = await client.request(createQuery, {
        wallet,
      });
      expect.fail("Should error cause duplicate");
    } catch (error) {
      expect(error).not.to.undefined;
    }
  });

  it("Should return user in GetUserByWallet", async () => {
    const testResult = await client.request(getUserByWalletQuery, {
      wallet,
    });
    expect(testResult.GetUserByWallet.wallet).to.be.equal(wallet);
    expect(testResult.GetUserByWallet.id).to.be.equal(id);
  });

  it("Should return empty in GetUserByWallet", async () => {
    const testResult = await client.request(getUserByWalletQuery, {
      wallet: "0xDDDDD",
    });
    expect(testResult.GetUserByWallet).to.be.null;
  });

  it("Should return user in GetUserByID", async () => {
    const testResult = await client.request(getUserByIDQuery, {
      id,
    });
    expect(testResult.GetUserByID.wallet).to.be.equal(wallet);
    expect(testResult.GetUserByID.id).to.be.equal(id);
  });

  it("Should return empty in GetUserByID", async () => {
    const testResult = await client.request(getUserByIDQuery, {
      id: "40e6215d-b5c6-4896-987c-f30f3678f608",
    });
    expect(testResult.GetUserByID).to.be.null;
  });

  it("Should update user by ID", async () => {
    const testResult = await client.request(updateUserByID, {
      id,
      input: { name: "anto", email: "anto@gmail.com" },
    });
    expect(testResult.UpdateUserProfile.name).to.be.equal("anto");
    expect(testResult.UpdateUserProfile.email).to.be.equal("anto@gmail.com");
  });
  it("Should update no user by ID", async () => {
    const testResult = await client.request(updateUserByID, {
      id: "40e6215d-b5c6-4896-987c-f30f3678f608",
      input: { name: "anto", email: "anto@gmail.com" },
    });
    expect(testResult.UpdateUserProfile).to.be.null;
  });
});
