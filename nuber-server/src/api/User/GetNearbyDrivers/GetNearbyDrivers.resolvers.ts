import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetNearbyDriversResponse } from "../../../types/graph";
import User from "../../../entities/User";
import { getRepository, Between } from "typeorm";

const resolvers: Resolvers = {
    Query: {
        GetNearbyDrivers: privateResolver(async(_, __, { req }): Promise<GetNearbyDriversResponse> => {
            const user: User = req.user;
            const { lastLng, lastLat } = user;
            try {
                const drivers: User[] = await getRepository(User).find({
                    id: user.id,
                    lastLng: Between(lastLng - 0.05, lastLng + 0.05),
                    lastLat: Between(lastLat - 0.05, lastLat + 0.05)
                });
                return {
                    ok: true,
                    error: null,
                    drivers
                };
            } catch(err) {
                return {
                    ok: false,
                    error: err.message,
                    drivers: null
                };
            }
        })
    }
}
export default resolvers;


