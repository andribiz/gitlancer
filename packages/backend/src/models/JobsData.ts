import {
  objectType,
  nonNull,
  stringArg,
  enumType,
  queryType,
  mutationType,
  arg,
  inputObjectType,
  nullable,
} from "nexus";

export const JobState = enumType({
  name: "JobState",
  members: ["DRAFT", "TENDER", "PROGRESS", "FINISHED"],
});

export const BiddingType = enumType({
  name: "BiddingType",
  members: [
    "OPEN_BID",
    "OPEN_FIX",
    "VERIFIED_BID",
    "VERIFIED_FIX",
    "WHITELIST_BID",
    "WHITELIST_FIX",
  ],
});

export const JobsData = objectType({
  name: "JobsData",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.datetime("createdAt");
    t.nullable.datetime("finishedAt");
    t.nonNull.string("title");
    t.nonNull.string("body");
    t.nullable.string("link");
    t.nonNull.field("state", { type: "JobState" });
    t.nonNull.float("price");
    t.nullable.string("contractAddress");
    t.nonNull.field("biddingType", {
      type: "BiddingType",
    });
    t.nullable.list.nonNull.field("applicants", {
      type: "JobsApplicant",
      resolve(parent, _args, context) {
        return context.db.jobsApplicant.findMany({
          where: { jobID: parent.id },
        });
      },
    });
    t.nonNull.string("creatorID");
    t.nonNull.field("creator", {
      type: "UsersProfile",
      async resolve(parent, _args, context) {
        return (await context.db.usersProfile.findFirst({
          where: { id: parent.creatorID },
        }))!;
      },
    });
  },
});

export const JobsDataInput = inputObjectType({
  name: "JobsDataInput",
  definition(t) {
    t.nonNull.string("title"),
      t.nonNull.string("body"),
      t.nullable.string("link"),
      t.nonNull.float("price"),
      t.nonNull.field("biddingType", {
        type: "BiddingType",
      }),
      t.nonNull.string("creatorID");
  },
});

export const JobsDataQuery = queryType({
  definition(t) {
    t.nullable.list.field("SearchJobsData", {
      type: "JobsData",
      args: {
        query: nullable(stringArg()),
      },
      resolve(_, args, context) {
        return context.db.jobsData.findMany({ take: 10 });
      },
    });

    t.nullable.field("SearchJobsDataID", {
      type: "JobsData",
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_, args, context) {
        return context.db.jobsData.findUnique({ where: { id: args.id } });
      },
    });
  },
});

export const JobsDataMutation = mutationType({
  definition(t) {
    t.nonNull.field("CreateJobsData", {
      type: "JobsData",
      args: {
        input: nonNull(arg({ type: "JobsDataInput" })),
      },
      resolve(_, args, context) {
        return context.db.jobsData.create({
          data: {
            ...args.input,
            createdAt: new Date(),
            state: "DRAFT",
          },
        });
      },
    });

    t.nonNull.field("ConfirmJob", {
      type: "JobsData",
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_, args, context) {
        return context.db.jobsData.update({
          where: { id: args.id },
          data: { state: "TENDER" },
        });
      },
    });
  },
});
