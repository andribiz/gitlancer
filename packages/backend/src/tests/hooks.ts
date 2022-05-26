import { ApolloServer } from "apollo-server-express";
import { execSync } from "child_process";
import { join } from "path";
import prisma from "../repository/prisma";

import { startServer } from "../server";

export const mochaHooks = {
  async beforeAll() {
    console.log("Using database test: ", process.env.DATABASE_URL);

    await startServer(8080);

    const prismaBinary = join(
      __dirname,
      "../..",
      "node_modules",
      ".bin",
      "prisma"
    );
    console.log("Creating Database Test");
    execSync(`${prismaBinary} db push --preview-feature`);
  },
  async afterAll() {
    console.log("Drop Database Test");
    // await prisma.$executeRaw`drop schema test cascade`;
  },
};
