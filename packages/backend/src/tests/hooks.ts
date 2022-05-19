import { ApolloServer } from "apollo-server-express";
import { execSync } from "child_process";
import { join } from "path";
import prisma from "../repository/prisma";

import { startServer } from "../server";

export const mochaHooks = {
  async beforeAll() {
    console.log("Masuk satu");
    await startServer(8080);

    process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;

    const prismaBinary = join(
      __dirname,
      "../..",
      "node_modules",
      ".bin",
      "prisma"
    );

    execSync(`${prismaBinary} db push --preview-feature`);
  },
  async afterAll() {
    // console.log("Delete satu");
    await prisma.$executeRaw`drop schema test cascade`;
  },
};
