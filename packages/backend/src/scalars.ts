import { FileUpload, GraphQLUpload } from "graphql-upload";
import { asNexusMethod } from "nexus";

export type Upload = Promise<FileUpload>;
export const Upload = asNexusMethod(GraphQLUpload!, "upload");
