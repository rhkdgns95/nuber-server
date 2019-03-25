import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { UpdateMyProfileMutationArgs, UpdateMyProfileResponse } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
    Mutation: {
        UpdateMyProfile: privateResolver(async(_, args: UpdateMyProfileMutationArgs, { req }): Promise<UpdateMyProfileResponse> => {
            const notNull = {};
            const user: User = req.user;
            try {
                Object.keys(args).forEach(key => {
                    if(args[key] !== null){
                        notNull[key] = args[key];
                    }
                });
                console.log(notNull);
                await User.update({id: user.id}, {...notNull});
                if(args.password !== null) {
                    user.password = args.password;
                    await user.save();
                }
                return {
                    ok: true,
                    error: null
                };
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