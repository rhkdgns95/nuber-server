import { withFilter } from "graphql-yoga";

const resolvers = {
    Subscription: {
        DriversSubscription: {
            subscribe: withFilter(
                (_, __, {pubSub}) => pubSub.asyncIterator("driverUpdate"),
                (payload, _, {context}) => {
                    const { DriversSubscription: {lastLng: driverLastLng, lastLat: driverLastLat}} = payload;
                    const { lastLat: userLastLat, lastLng: userLastLng } = context.currentUser;
                    return (
                        driverLastLat >= userLastLat - 0.05 &&
                        driverLastLat <= userLastLat + 0.05 &&
                        driverLastLng >= userLastLng - 0.05 &&
                        driverLastLng <= userLastLng + 0.05
                    );
                }
            )
        }
    }
}

export default resolvers;