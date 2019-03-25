import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import cleanNullArgs from "../../../utils/cleanNullArg";
import { ReportMovementMutationArgs, ReportMovementResponse } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
    Mutation: {
        ReportMovement: privateResolver(async(_, args:ReportMovementMutationArgs, { req, pubSub }): Promise<ReportMovementResponse> => {
            const user: User = req.user;
            const notNull = cleanNullArgs(args);
            try {
                await User.update({id: req.user.id}, {...notNull});
                const updatedUser = await User.findOne({id: user.id});
                pubSub.publish("driverUpdate", {DriversSubscription: updatedUser});
                return {
                    ok: true,
                    error: null
                };
            } catch(err) {
                return {
                    ok: false,
                    error: err.message,
                }
            }
        })
    }
}

export default resolvers;