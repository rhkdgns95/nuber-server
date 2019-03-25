import { Resolvers } from "../../../types/resolvers";
import { EmailSignUpResponse, EmailSignUpMutationArgs } from "../../../types/graph";
import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import createJWT from "../../../utils/createJWT";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp: async(_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
            const {email, phoneNumber} = args;
            try {
                const existEmail = await User.findOne({email});
                if(existEmail) {
                   return {
                       ok: false,
                       error: "You should log in email",
                       token: null
                   } ;
                }
                const existVerification = await Verification.findOne({payload: phoneNumber, verified: true}); 
                if(!existVerification) {
                    return {
                        ok: false,
                        error: "Verify your phone number",
                        token: null
                    };
                }
                const newUser = await User.create({...args}).save();
                if (newUser.email) {
                    const verification = await Verification.create({payload: newUser.email, target: "EMAIL"}).save();

                    await sendVerificationEmail(newUser.fullName, verification.key);
                }

                const token = createJWT(newUser.id);

                return {
                    ok: true,
                    error: null,
                    token
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                }
            }
        }
    }
}

export default resolvers;