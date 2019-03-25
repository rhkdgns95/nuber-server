import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { CompleteEmailVerificationMutationArgs, CompleteEmailVerificationResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Verification from "../../../entities/Verification";

const resolvers: Resolvers = {
    Mutation: {
        CompleteEmailVerification: privateResolver(async(_, args: CompleteEmailVerificationMutationArgs, { req }): Promise<CompleteEmailVerificationResponse> => {
            const user: User = req.user;
            const {key} = args;
            try {
                if(user.email) {
                    const verification = await Verification.findOne({payload: user.email, key});
                    if(verification) {

                        user.verifiedEmail = true;
                        user.save();
                        
                        return {
                            ok: true,
                            error: null
                        };
                    } else {
                        return {
                            ok: false,
                            error: "No verify"
                        };
                    }
                } else {
                    return {
                        ok: false,
                        error: "No email to verify"
                    };
                }
            } catch(err) { 
                return {
                    ok: false,
                    error: err.message
                };
            }
        })
    }
}

export default resolvers;