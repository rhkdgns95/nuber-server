import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { DeletePlaceResponse, DeletePlaceMutationArgs } from "../../../types/graph";
import User from "../../../entities/User";
import Place from "../../../entities/Place";

const resolvers: Resolvers = {
    Mutation: {
        DeletePlace: privateResolver(async(_, args: DeletePlaceMutationArgs, { req }): Promise<DeletePlaceResponse> => {
            const user: User = req.user;
            try {
                const place = await Place.findOne({id: args.placeId});
                if(place) {
                    if(place.userId === user.id){ 
                        await place.remove();
                        return {
                            ok: true,
                            error: null
                        };
                    } else {
                        return {
                            ok: false,
                            error: "No Authorized"
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