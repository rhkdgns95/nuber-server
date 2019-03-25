import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { UpdateRideStatusMutationArgs, UpdateRideStatusResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
    Mutation: {
        UpdateRideStatus: privateResolver(async(_, args: UpdateRideStatusMutationArgs, { req, pubSub }): Promise<UpdateRideStatusResponse> => {
            const user: User = req.user;
            if(user.isDriving) {
                try {
                    let ride: Ride | undefined;
                    if(args.status === "ACCEPTED") {
                        ride = await Ride.findOne({
                            id: args.rideId,
                            status: "REQUESTING"}, {relations: ["passenger"]});
                        if(ride) {
                            ride.driver = user;
                            user.isTaken = true;
                            await user.save();
                            const chat = await Chat.create({
                                driver: user ,
                                passenger: ride.passenger,
                            }).save();
                            ride.chat = chat;
                        }
                    } else {
                        ride = await Ride.findOne({
                            id: args.rideId,
                            driver: user
                        });
                    }   
                    if(ride) {
                        ride.status = args.status;
                        await ride.save();
                        pubSub.publish("rideUpdate", {RideStatusSubscription: ride});
                        return {
                            ok: true,
                            error: null
                        };
                    } else {
                        return {
                            ok: false,
                            error: "Not Found Ride"
                        };
                    }

                } catch(err) {
                    return {
                        ok: false,
                        error: err.message
                    };
                }
    
            } else {
                return {
                    ok: false,
                    error: "Not Driver"
                };
            }
        })
    }
}

export default resolvers;