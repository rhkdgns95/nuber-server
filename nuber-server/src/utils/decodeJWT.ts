import jwt from "jsonwebtoken";
import User from "../entities/User";

const decodeJWT = async(token: string): Promise<User | undefined> => {
    try{
        const secret = process.env.JWT_TOKEN || "";
        const decoded: any = await jwt.verify(token, secret);
        const {id} = decoded;
        const user = await User.findOne({id});
        
        
        return user;
    } catch( err ) {
        return undefined;
    }
}

export default decodeJWT;