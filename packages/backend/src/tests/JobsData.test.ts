import { expect } from "chai";
import { gql, GraphQLClient } from "graphql-request";

describe.only("Job Data Test", async () => {
  let client: GraphQLClient;
  let userID: string;
  let jobID: string;
  const wallet = "0xDDDDDD";

  const createJobQuery = gql`
    mutation CreateJobsData($input: JobsDataInput!) {
      CreateJobsData(input: $input) {
        id
        body
        creatorID
        createdAt
        title
      }
    }
  `;

  const createUserQuery = gql`
    mutation CreateUserByWallet($wallet: String!) {
      CreateUserByWallet(wallet: $wallet) {
        id
        wallet
      }
    }
  `;

  before(async () => {
    client = new GraphQLClient(`http://localhost:8080/graphql`);
  });

  it("Should create Job", async () => {
    //Create user first
    let testResult = await client.request(createUserQuery, {
      wallet,
    });
    expect(testResult.CreateUserByWallet.wallet).to.be.equal(wallet);
    userID = testResult.CreateUserByWallet.id;

    testResult = await client.request(createJobQuery, {
      input: {
        title: "New Job",
        body: "Halo Apa Kabar",
        link: "https://daasd.com",
        price: 100,
        biddingType: "VERIFIED_BID",
        creatorID: userID,
      },
    });
    expect(testResult.CreateJobsData).not.to.be.null;
    expect(testResult.CreateJobsData.creatorID).to.be.equal(userID);
    jobID = testResult.CreateJobsData.id;
  });

  // it("Should error user wallet unique", async () => {
  //   try {
  //     const testResult = await client.request(createQuery, {
  //       wallet,
  //     });
  //     expect.fail("Should error cause duplicate");
  //   } catch (error) {
  //     expect(error).not.to.undefined;
  //   }
  // });

  // it("Should return user in GetUserByWallet", async () => {
  //   const testResult = await client.request(getUserByWalletQuery, {
  //     wallet,
  //   });
  //   expect(testResult.GetUserByWallet.wallet).to.be.equal(wallet);
  //   expect(testResult.GetUserByWallet.id).to.be.equal(id);
  // });

  // it("Should return empty in GetUserByWallet", async () => {
  //   const testResult = await client.request(getUserByWalletQuery, {
  //     wallet: "0xDDDDD",
  //   });
  //   expect(testResult.GetUserByWallet).to.be.null;
  // });

  // it("Should return user in GetUserByID", async () => {
  //   const testResult = await client.request(getUserByIDQuery, {
  //     id,
  //   });
  //   expect(testResult.GetUserByID.wallet).to.be.equal(wallet);
  //   expect(testResult.GetUserByID.id).to.be.equal(id);
  // });

  // it("Should return empty in GetUserByID", async () => {
  //   const testResult = await client.request(getUserByIDQuery, {
  //     id: "40e6215d-b5c6-4896-987c-f30f3678f608",
  //   });
  //   expect(testResult.GetUserByID).to.be.null;
  // });

  // it("Should update user by ID", async () => {
  //   const testResult = await client.request(updateUserByID, {
  //     id,
  //     input: { name: "anto", email: "anto@gmail.com" },
  //   });
  //   expect(testResult.UpdateUserProfile.name).to.be.equal("anto");
  //   expect(testResult.UpdateUserProfile.email).to.be.equal("anto@gmail.com");
  // });
  // it("Should update no user by ID", async () => {
  //   const testResult = await client.request(updateUserByID, {
  //     id: "40e6215d-b5c6-4896-987c-f30f3678f608",
  //     input: { name: "anto", email: "anto@gmail.com" },
  //   });
  //   expect(testResult.UpdateUserProfile).to.be.null;
  // });
});
