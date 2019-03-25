import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { RequestRideResponse, RequestRideMutationArgs } from "../../../types/graph";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
    Mutation: {
        RequestRide: privateResolver(async(_, args: RequestRideMutationArgs, { req, pubSub }): Promise<RequestRideResponse> => {
            const user: User = req.user;
            if(user.isRiding || user.isDriving) {
                return {
                    ok: false,
                    error: "You can`t two rides Or you are driving",
                    ride: null
                };
            }

            try {
                const ride = await Ride.create({...args, passenger: user}).save();
                pubSub.publish("rideRequest", {NearbyRideSubscription: ride});
                user.isRiding = true;
                user.save();
                
                return {
                    ok: true,
                    error: null,
                    ride
                };
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