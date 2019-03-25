import jwt from "jsonwebtoken";

const createJWT = (id: number):string => {
    const secret = process.env.JWT_TOKEN || "";
    const token = jwt.sign({
        id
        }, secret);
    return token;
}

export default createJWT;