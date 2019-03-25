import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { EditPlaceMutationArgs, EditPlaceResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Place from "../../../entities/Place";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
    Mutation: {
        EditPlace: privateResolver(async(_, args: EditPlaceMutationArgs, {req}): Promise<EditPlaceResponse> => {
            const user: User = req.user;
            try {
                const place = await Place.findOne({id: args.placeId});
                if(place) {
                    if(user.id === place.userId){
                        const notNull = await cleanNullArgs(args);
                        await Place.update({id: place.id}, {...notNull});
                        return {
                            ok: true,
                            error: null
                        };
                    } else {
                        return {
                            ok: false,
                            error: "Not Authorized"
                        };
                    }
                } else {
                    return {
                        ok: false,
                        error: "Not Found Place"
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