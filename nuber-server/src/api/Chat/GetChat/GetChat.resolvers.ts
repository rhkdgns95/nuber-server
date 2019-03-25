import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetChatQueryArgs, GetChatResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
    Query: {
        GetChat: privateResolver(async(_, args: GetChatQueryArgs, { req }): Promise<GetChatResponse> => {
            const user: User = req.user;
            try {
                const chat = await Chat.findOne({id: args.chatId}, {relations: ["messages"]});
                if(chat) {
                    if(chat.passengerId === user.id || chat.driverId === user.id) {
                        return {
                            ok: true,
                            error: null,
                            chat
                        };
                    } else {
                        return { 
                            ok: false,
                            error: "No Authorized",
                            chat: null
                        };
                    }
                } else {
                    return {
                        ok: false,
                        error: "Not Found Chat",
                        chat: null
                    };
                }
            } catch(err) {
                return {
                    ok: false,
                    error: err.message,
                    chat: null
                };
            }

        })
    }
}

export default resolvers;