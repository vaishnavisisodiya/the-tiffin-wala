const providerModel = require('../models/provider')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()
exports.isProvider = async (req,res,next) =>{    
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            const token = req.headers.authorization.split(" ")[1];
            const decodeData = jwt.verify(token, process.env.SECRET_KEY);
            const provider = await providerModel.findById(decodeData.id).select('-password');
            if(provider)
                req.provider = provider
            else
                res.status(400).json({message:"Invalid Request"})
            next();
        }else{
            res.status(400).json({message:"token not found"});
        }
        }catch(error){
            return res.status(500).json({success:false,message:error.message});
    }
}