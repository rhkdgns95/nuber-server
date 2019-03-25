import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetNearbyRideResponse } from "../../../types/graph";
import User from "../../../entities/User";
import { getRepository, Between } from "typeorm";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
    Query: {
        GetNearbyRide: privateResolver(async(_, __, { req, pubSub }): Promise<GetNearbyRideResponse> => {
            const user: User = req.user;
            const { lastLat, lastLng } = user;
            if(!user.isDriving){
                return {
                    ok: false,
                    error: "You are driving status",
                    ride: null
                };
            }
            try {
                const ride = await getRepository(Ride).findOne({
                    status: "REQUESTING",
                    pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
                    pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
                });
                if( ride) {
                    return {
                        ok: true,
                        error: null,
                        ride
                    }
                } else {
                    return {
                        ok: true,
                        error: null,
                        ride: null
                    };
                }
            } catch(err) {
                return {
                    ok: false,
                    error: err.message,
                    ride: null
                }
            }
        })
    }
}

export default resolvers;