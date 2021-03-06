import { Prisma } from "@prisma/client";
import {
  objectType,
  extendType,
  nonNull,
  stringArg,
  inputObjectType,
  arg,
} from "nexus";

export const UsersProfile = objectType({
  name: "UsersProfile",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("wallet");
    t.nullable.string("name");
    t.nullable.string("email");
  },
});

export const UsersProfileInput = inputObjectType({
  name: "UsersProfileInput",
  definition(t) {
    t.nullable.string("name");
    t.nullable.string("email");
  },
});

export const UsersProfileQuery = extendType({
  type: "Query",
  definition(t) {
    t.nullable.field("GetUserByWallet", {
      type: "UsersProfile",
      args: {
        wallet: nonNull(stringArg()),
      },
      resolve(_parent, args, context) {
        return context.db.usersProfile.findUnique({
          where: { wallet: args.wallet },
        });
      },
    });

    t.nullable.field("GetUserByID", {
      type: "UsersProfile",
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, context) {
        return context.db.usersProfile.findUnique({
          where: { id: args.id },
        });
      },
    });
  },
});

export const UserProfileQuery = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("CreateUserByWallet", {
      type: "UsersProfile",
      args: {
        wallet: nonNull(stringArg()),
      },
      resolve(_, args, context) {
        return context.db.usersProfile.create({
          data: {
            wallet: args.wallet,
          },
        });
      },
    });

    t.nullable.field("UpdateUserProfile", {
      type: "UsersProfile",
      args: {
        id: nonNull(stringArg()),
        input: nonNull(arg({ type: "UsersProfileInput" })),
      },
      async resolve(_, args, context) {
        const { id, input } = args;
        try {
          const res = await context.db.usersProfile.update({
            where: {
              id,
            },
            data: {
              ...input,
            },
          });
          return res;
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code == "P2025") return null;
          }
        }
        return null;
      },
    });
  },
});

// export const CreateUser = extendType({
//   type: "Mutation",
//   definition(t) {
//     t.nonNull.field("CreateUserFromWallet", {
//       type: "UsersProfile",
//       args: {
//         wallet: nonNull(stringArg()),
//       },
//       async resolve(parent, args, context) {
//         const { wallet } = args;
//         return await context.db.usersProfile.create({
//           data: { wallet },
//         });
//       },
//     });
//   },
// });

// export const UpdateUser = extendType({
//   type: "Mutation",
//   definition(t) {
//     t.nullable.field("UpdateUser", {
//       type: "Users",
//       args: {
//         wallet: nonNull(stringArg()),
//         name: nonNull(stringArg()),
//         email: nullable(stringArg()),
//       },
//       async resolve(parent, args, context) {
//         return await context.db.userStore.updateUser(args);
//       },
//     });
//   },
// });
