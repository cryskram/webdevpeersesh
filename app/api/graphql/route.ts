import { ApolloServer } from "@apollo/server";
import { typeDef } from "./typedef";
import { resolvers } from "./resolvers";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const server = new ApolloServer({ typeDefs: typeDef, resolvers: resolvers });
const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
