import { PrismaClient } from "@prisma/client";
// import PGstore from "./datastore";

export interface Context {
  db: PrismaClient;
}

const prisma = new PrismaClient({
  log: [
    { level: "warn", emit: "event" },
    { level: "error", emit: "event" },
    { level: "info", emit: "event" },
    { level: "query", emit: "event" },
  ],
});

prisma.$on("warn", (e) => {
  console.log(e);
});

prisma.$on("info", (e) => {
  console.log(e);
});

prisma.$on("error", (e) => {
  console.log(e);
});

prisma.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

export const context = {
  db: prisma,
};
