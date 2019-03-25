import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from "typeorm";
import Chat from "./Chat";
import User from "./User";
// type Message {
//     id: Int!
//     text: String!
//     chat: Chat!
//     user: User!
//     craetedAt: String!
//     updatedAt: String!
// }

@Entity()
class Message extends BaseEntity{
    @PrimaryGeneratedColumn() id: number;
    
    @Column({type: "text"})
    text: string;

    @Column({nullable: true})
    chatId: number;

    @ManyToOne(type => Chat, chat => chat.messages)
    chat: Chat;

    @ManyToOne(type => User, user => user.messages)
    user: User;
    
    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Message;