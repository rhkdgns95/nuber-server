import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { RequestEmailVerificationResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
    Mutation: {
        RequestEmailVerification: privateResolver( async(_, __, {req}): Promise<RequestEmailVerificationResponse> =>{
            const user: User = req.user;
            if(user.email && !user.verifiedEmail) {
                try {
                    const oldVerification = await Verification.findOne({payload: user.email});
                    if(oldVerification)    
                        oldVerification.remove();
                    
                    const newVerification = await Verification.create({
                        payload: user.email,
                        target: "EMAIL"
                    }).save();
                    
                    await sendVerificationEmail(user.fullName, newVerification.key);

                    return {
                        ok: true,
                        error: null
                    };

                } catch (err) {
                    return {
                        ok: false,
                        error: err.message
                    };
                }
                
            } else {
                return {
                    ok: false,
                    error: "No email to verify"
                };
            }
        })
    }
}
export default resolvers;