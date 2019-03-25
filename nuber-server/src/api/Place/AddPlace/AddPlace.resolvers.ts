import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { AddPlaceMutationArgs, AddPlaceResponse } from "../../../types/graph";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArg";
import Place from "../../../entities/Place";

const resolvers: Resolvers = {
    Mutation: {
        AddPlace: privateResolver(async(_, args: AddPlaceMutationArgs, { req }): Promise<AddPlaceResponse> => {
            const user: User = req.user;
            const notNull = cleanNullArgs(args); 
            try {
                await Place.create({...notNull, user}).save();
                return {
                    ok: true,
                    error: null
                };
            } catch( err ){
                return {
                    ok: false,
                    error: err.message
                };
            }
        })
    }
}
export default resolvers;
