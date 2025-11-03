import jwt from 'jsonwebtoken';


//to generate token for a particular user
export const genToken = async (userId) => {
    try {
        //generate token
        const token =  jwt.sign({userId} , process.env.JWT_SECRET , {expiresIn:"7d"});
        return token;
    } catch (error) {
        console.log("GenToken error");
        
        console.log(error);
        
    }
}