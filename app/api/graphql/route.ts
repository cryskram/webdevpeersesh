import { ApolloServer } from "@apollo/server";
import { typeDef } from "./typedef";
import { resolvers } from "./resolvers";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const server = new ApolloServer({ typeDefs: typeDef, resolvers: resolvers });
const handler = startServerAndCreateNextHandler(server);

export async function GET(req: Request) {
  return handler(req);
}

export async function POST(req: Request) {
  return handler(req);
}
