import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./models";
import { Upload } from "./scalars";

export const schema = makeSchema({
  types: [types, Upload],
  outputs: {
    schema: join(process.cwd(), "graphql/schema.graphql"),
    typegen: join(process.cwd(), "src/nexus-typegen.ts"),
  },
  contextType: {
    // module: join(process.cwd(), "src/context.ts"),
    module: require.resolve("./context"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        // module: join(process.cwd(), "src/scalars.ts"),
        module: require.resolve("./scalars"),
        alias: "BackingScalars",
      },
    ],
  },
});
