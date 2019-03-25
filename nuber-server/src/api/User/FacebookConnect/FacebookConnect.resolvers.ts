import {Resolvers} from "../../../types/resolvers";
import { FacebookConnectMutationArgs, FacebookConnectResponse } from "../../../types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
    Mutation: {
        FacebookConnect: async (_, args:FacebookConnectMutationArgs):Promise<FacebookConnectResponse> => {
            const {fbId} = args;
            try {
                const existUser = await User.findOne({fbId});
                if(existUser) { 
                    const token = createJWT(existUser.id); 
                    console.log("already User!");
                    return {
                        ok: true,
                        error: null,
                        token
                    };
                }
            } catch(err){
                return {
                    ok: false,
                    error: err.message,
                    token: null
                };
            }
            try{
                const newUser = await User.create({
                    ...args,
                    profilePhoto: `https://graph.facebook.com/${fbId}/picture?type=square`
                }).save();

                const token = createJWT(newUser.id);
                console.log("new User!");
                return {
                    ok: true,
                    error: null,
                    token
                };
            } catch(err){
                return {
                    ok: false,
                    error: err.message,
                    token: null
                }
            }
        }
    }
}
export default resolvers;