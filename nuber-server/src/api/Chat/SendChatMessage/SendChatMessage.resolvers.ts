import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { SendChatMessageResponse, SendChatMessageMutationArgs } from "../../../types/graph";
import User from "../../../entities/User";
import Message from "../../../entities/Message";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
    Mutation: {  
        SendChatMessage: privateResolver(async(_, args: SendChatMessageMutationArgs, {req, pubSub}): Promise<SendChatMessageResponse> => {
            const user: User = req.user;
            const {text, chatId} = args;

            try {
                const chat = await Chat.findOne({id: chatId});
                if(chat) {
                    if(chat.driverId ===user.id || chat.passengerId === user.id) {
                        const message = await Message.create({text, chat, user}).save();
                        pubSub.publish("newChatMessage", { MessageSubscription: message });
                        return {
                            ok: true,
                            error: null,
                            message
                        };
                    } else {
                        return {
                            ok: false,
                            error: "No Authorized",
                            message: null
                        };
                    }
                } else {
                    return {
                        ok: false,
                        error: "Not Found Chat",
                        message: null
                    };
                }
            } catch(err) {
                return {
                    ok: false,
                    error : err.message,
                    message: null
                };
            }
        })
    }
}

export default resolvers;