import { BaseEntity, Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { rideStatus } from "../types/types";
import User from "./User";
import Chat from "./Chat";
@Entity()
class Ride extends BaseEntity{
    @PrimaryGeneratedColumn() id: number;

    @Column({type: "text", enum:["ACCEPTED", "ONROUTE", "CANCELED", "REQUETING", "FINISHED"], default: "REQUESTING"})
    status: rideStatus;

    @Column({type: "text"})
    pickUpAddress: string;

    @Column({type: "double precision", default: 0})
    pickUpLat: number;
    @Column({type: "double precision", default: 0})
    pickUpLng: number;

    @Column({type: "text"})
    dropOffAddress: string;
    @Column({type: "double precision", default: 0})
    dropOffLat: number;
    @Column({type: "double precision", default: 0})
    dropOffLng: number;

    @Column({type: "double precision", default: 0})
    price: number;
    @Column({type: "text"})
    duration: string;
    @Column({type: "text"})
    distance: string;

    @Column({nullable: true})
    chatId: number;

    // 1:1 관계에서 주인은 Ride이다. Ride가 존재해야 Chat도 필요해지기 때문이다.
    // ride상태가 REQUESTING이라면 chat이 존재하지않는다. 즉 chat은 ride가 ACCEPTED되어야만 생성이 된다.
    @OneToOne(type => Chat, chat => chat.ride, {nullable: true})
    @JoinColumn()
    chat: Chat;

    @Column({nullable: true})
    passengerId: number;

    @Column({nullable: true})
    driverId: number;

    @ManyToOne(type => User, user => user.ridesAsPassenger)
    passenger: User;
    
    @ManyToOne(type => User, user => user.ridesAsDriver, {nullable: true})
    driver: User;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;

}
export default Ride;