import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetRideQueryArgs, GetRideResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
    Query: {
        GetRide: privateResolver(async(_, args: GetRideQueryArgs, { req }): Promise<GetRideResponse> => {
            const user: User = req.user;
            try {
                const ride = await Ride.findOne({id: args.rideId});
                if(ride) {
                    if(ride.passengerId === user.id || ride.driverId === user.id) {
                        return {
                            ok :true,
                            error: null,
                            ride
                        };
                    } else {
                        return {
                            ok: false,
                            error: "No Authorized",
                            ride: null
                        };
                    }
                } else {
                    return {
                        ok: false,
                        error: "Not Found Ride",
                        ride: null
                    };
                }
            } catch(err) {
                return {
                    ok: false,
                    error: err.message,
                    ride: null
                };
            }
        })
    }
}

export default resolvers;