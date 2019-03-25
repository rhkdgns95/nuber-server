import dotenv from "dotenv";
dotenv.config();
import { createConnection } from "typeorm";
import {Options} from "graphql-yoga";
import app from "./app";
import connectionOptions from "./ormConfig";
import decodeJWT from "./utils/decodeJWT";

const PORT = process.env.port || 4000;
const PLAYGROUND_ENDPOINT = "/playground";
const GRAPHQL_ENDPOINT = "/graphql";
const SUBSCRIPTION_ENDPOINT = "/subscription";
const appOptions: Options = {
    port: PORT,
    playground: PLAYGROUND_ENDPOINT,
    endpoint: GRAPHQL_ENDPOINT,
    subscriptions: {
        path: SUBSCRIPTION_ENDPOINT,
        onConnect: async connectionParams => {
            const token = connectionParams['X-JWT'];
            if(token) {
                const user = await decodeJWT(token);
                if(user) {
                    return {
                        currentUser: user   
                    };
                }
            }
            throw new Error("No JWT. Can`t subscribe");
        }
    }
};
const Conn = () => console.log("GraphQLServer Running");
createConnection(connectionOptions).then(() => {
    app.start(appOptions, Conn);
});