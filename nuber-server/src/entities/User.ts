import bcrypt from "bcrypt-nodejs";
import { IsEmail  } from "class-validator";
import { BaseEntity,
        BeforeInsert,
        BeforeUpdate, 
        Column, 
        CreateDateColumn, 
        Entity, 
        PrimaryGeneratedColumn, 
        UpdateDateColumn, 
        OneToMany} from "typeorm";
import Chat from "./Chat";
import Message from "./Message";
import Ride from "./Ride";
import Place from "./Place";

@Entity()
class User extends BaseEntity{
    @PrimaryGeneratedColumn() id: number;
    
    @Column({type: "text", nullable: true})
    @IsEmail()
    email: string | null;

    @Column({type:"boolean", default: false})
    verifiedEmail: boolean;

    @Column({type: "text"})
    firstName: string

    @Column({type:"text"})
    lastName: string
 
    @Column({type:"int", nullable: true})
    age: number
    
    @Column({type:"text", nullable: true})
    password: string;

    @Column({type:"text", nullable: true})
    phoneNumber: string;

    @Column({type:'boolean', default:false})
    verifiedPhoneNumber: boolean;    

    @Column({type:'text'})
    profilePhoto: string;

    @Column({type: "boolean", default: false})
    isDriving: boolean;

    @Column({type:"boolean", default: false})
    isRiding: boolean;

    @Column({type: "boolean", default: false})
    isTaken: boolean;

    @Column({type: 'double precision', default: 0})
    lastLng: number;

    @Column({type: 'double precision', default: 0})
    lastLat: number;

    @Column({type: 'double precision', default: 0})
    lastOrientation: number;

    @Column({type: "text", nullable: true})
    fbId: string;
    
    get fullName():string {
        return `${this.firstName} ${this.lastName}`;
    }

    @OneToMany(type => Chat, chat => chat.passenger)
    chatsAsPassenger: Chat[];

    @OneToMany(type => Chat, chat => chat.driver)
    chatsAsDriver: Chat[];

    @OneToMany(type => Message, message => message.user)
    messages: Message[];

    @OneToMany(type => Ride, ride => ride.passenger)
    ridesAsPassenger: Ride[];

    @OneToMany(type => Ride, ride => ride.driver)
    ridesAsDriver: Ride[];

    @OneToMany(type => Place, place => place.user)
    places: Place[];

    @CreateDateColumn() createdAt:string;
    @UpdateDateColumn() updatedAt:string;

    public comparePassword = (password: string): boolean => bcrypt.compareSync(password, this.password);

    @BeforeInsert()
    @BeforeUpdate()
    savePassword = ():void => {
        if(this.password){
            this.password = this.hashPassword(this.password);
        }
    }

    private hashPassword = (password:string):string => {
        return bcrypt.hashSync(password);
    }
    
}
//확인해보기

export default User;