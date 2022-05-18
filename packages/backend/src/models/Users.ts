import { UserInputError } from "apollo-server";
import { objectType, extendType, nonNull, stringArg, nullable } from "nexus";

export const Users = objectType({
  name: "Users",
  definition(t) {
    t.nonNull.id("wallet");
    t.nullable.string("name");
    t.nullable.string("email");
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nullable.field("GetUserByWallet", {
      type: "Users",
      args: {
        wallet: nonNull(stringArg()),
      },
      async resolve(parent, args, context, info) {
        const res = await context.db.userStore.getUserByWallet(args.wallet);
        if (res === undefined) {
          throw new UserInputError("Wallet not exists");
        }
        return res;
      },
    });
  },
});

export const CreateUser = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("CreateUser", {
      type: "Users",
      args: {
        wallet: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        const { wallet } = args;
        return await context.db.userStore.createUser(wallet);
      },
    });
  },
});

export const UpdateUser = extendType({
  type: "Mutation",
  definition(t) {
    t.nullable.field("UpdateUser", {
      type: "Users",
      args: {
        wallet: nonNull(stringArg()),
        name: nonNull(stringArg()),
        email: nullable(stringArg()),
      },
      async resolve(parent, args, context) {
        return await context.db.userStore.updateUser(args);
      },
    });
  },
});
