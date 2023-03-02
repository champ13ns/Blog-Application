import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // console.log("token is ",token);
    if(token == null){
        return res.status(404).json({
            msg:"token is missing"
        })
    }
        else{
            jwt.verify(token,process.env.ACCESS_SECRET_KEY , (err,user) => {
                if(err){
                    console.log("err is ",err);
                    return res.status(404).json({
                        msg:"invalid token"
                    })
                }
                req.user = user;
                next();
            })

        }
    
}