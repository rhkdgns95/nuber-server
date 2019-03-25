import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, Column, OneToOne } from "typeorm";
import Message from "./Message";
import User from "./User";
import Ride from "./Ride";
//   id: Int!
//     message : [Message]!
//     participants: [User]!
//     craetdAt: String!
//     updatedAt: String!

@Entity()
class Chat extends BaseEntity { 
    @PrimaryGeneratedColumn() id: number;

    @Column({nullable: true})
    passengerId: number;
    
    @Column({nullable: true})
    driverId: number;

    @Column({nullable: true})
    rideId: number;

    @OneToMany(type => Message, message => message.chat)
    messages: Message[]; 
    
    @OneToOne(type => Ride, ride => ride.chat, {nullable: true})
    ride: Ride;

    @ManyToOne(type => User, user => user.chatsAsPassenger)
    passenger: User;

    @ManyToOne(type => User, user => user.chatsAsDriver)
    driver: User;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Chat;