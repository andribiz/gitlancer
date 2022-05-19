import { FileUpload, GraphQLUpload } from "graphql-upload";
import { asNexusMethod } from "nexus";
import { DateTimeResolver } from "graphql-scalars";

export type Upload = Promise<FileUpload>;
export const Upload = asNexusMethod(GraphQLUpload!, "upload");
export const DateTime = asNexusMethod(DateTimeResolver, "datetime");
