import { GraphQLServer, PubSub } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import cors from "cors";
import schema from "./schema";
import { Response, NextFunction } from "express";
import decodeJWT from "./utils/decodeJWT";

class App {
    app: GraphQLServer;
    public pubSub: any;

    constructor() {
        this.app = new GraphQLServer({
            schema,
            context: req => {
                // const {connection : {context}} = req;
                const {connection: {context = null} = {}} = req;
                return {
                    req: req.request,
                    pubSub: this.pubSub,
                    context
                };
            }
        })
        this.pubSub = new PubSub();
        this.pubSub.ee.setMaxListeners(99);
        this.middlewares();    
    }
    private middlewares = () => {
        this.app.express.use(helmet());
        this.app.express.use(cors());
        this.app.express.use(logger("dev"));
        this.app.express.use(this.jwt);
    }
    private jwt = async(req, res:Response, next: NextFunction):Promise<void> => {
        const token = req.get("X-JWT");
        if(token) {
            const user = await decodeJWT(token);
            if(user) {
                req.user = user;
            } else {
                req.user = undefined;
            }
        }
        next();
    }
}

export default new App().app;