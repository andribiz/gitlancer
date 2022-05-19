import { PrismaClient } from "@prisma/client";
import prisma from "./repository/prisma";
// import PGstore from "./datastore";

export interface Context {
  db: PrismaClient;
}

export const context = {
  db: prisma,
};
