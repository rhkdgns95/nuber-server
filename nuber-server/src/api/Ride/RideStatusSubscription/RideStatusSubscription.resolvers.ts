import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
    Subscription: {
        RideStatusSubscription: {
            subscribe: withFilter(
                (_, __, { pubSub }) => pubSub.asyncIterator("rideUpdate"),
                (payload, _, { context }) => {
                    const { RideStatusSubscription: { driverId, passengerId } } = payload;
                    const user: User = context.currentUser;
                    return (
                        driverId === user.id ||
                        passengerId === user.id
                    );
                }
            )
        }
    }
}

export default resolvers;