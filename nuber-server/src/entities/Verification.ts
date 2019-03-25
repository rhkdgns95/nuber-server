import {BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, Entity} from "typeorm";
import { VerificationTarget } from "../types/types";
const PHONE = "PHONE";
const EMAIL = "EMAIL";

@Entity()
class Verification extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({type: "text", enum:[PHONE, EMAIL]})
    target: VerificationTarget;

    @Column({type: 'text'})
    key: string;

    @Column({type: 'text'})
    payload: string;

    @Column({type: "boolean", default: false})
    verified: boolean;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;

    @BeforeInsert()
    createKey = ():void => {
        if(this.target === PHONE) {
            this.key = Math.floor(Math.random() * 10000).toString();
        }  else if(this.target === EMAIL) {
            this.key = Math.random().toString(36).substr(2);
        }
    }
}
export default Verification;