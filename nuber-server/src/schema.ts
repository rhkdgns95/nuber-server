import {GraphQLSchema} from "graphql";
import {fileLoader, mergeTypes, mergeResolvers} from "merge-graphql-schemas";
import {makeExecutableSchema} from "graphql-tools";
import path from "path";

const allTypes: GraphQLSchema[] | any = fileLoader(
    path.join(__dirname, "./api/**/*.graphql")
);
const allResolvers:string[] | any[]  = fileLoader(
    path.join(__dirname, "./api/**/*.resolvers.*")
);

const mergedTypes = mergeTypes(allTypes);
const mergedResolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
    typeDefs: mergedTypes,
    resolvers: mergedResolvers
});

export default schema;