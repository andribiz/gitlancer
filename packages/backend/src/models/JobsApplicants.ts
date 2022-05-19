import { objectType, enumType } from "nexus";

export const ApplicantState = enumType({
  name: "ApplicantState",
  members: ["ACCEPTED", "PROGRESS", "REJECTED"],
});

export const JobsApplicant = objectType({
  name: "JobsApplicant",
  definition(t) {
    t.nonNull.string("jobID");
    t.nonNull.string("userID");
    t.nullable.field("job", {
      type: "JobsData",
      resolve(parent, args, context) {
        return context.db.jobsData.findUnique({
          where: { id: parent.jobID },
        });
      },
    });
    t.nonNull.field("state", { type: "ApplicantState" });
    t.nonNull.float("bidPrice");
  },
});
