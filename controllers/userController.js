const UserModel = require('../models/user');
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports.register = async (req,res,next) =>{

    try {
        const { username,email,password } = req.body;
        const usernameCheck = await UserModel.findOne({ username });

        if(usernameCheck){
            return res.json({ message:'User already exists !', status: false });
        }
        
        const emailCheck = await UserModel.findOne({ email });
        if(emailCheck){
            return res.json({ message :'User already exists !' ,status: false});
        }
    
        const salt = await Bcrypt.genSalt(12);
        const hashedPassword = await Bcrypt.hash(password,salt);
    
        const user = await UserModel.create({
            username :username,
            email :email,
            password :hashedPassword
        });
        return res.json({ message:'A new user is created !', status:true,user });
    } catch (error) {
        console.log(`Error while trying to register a new user ${error}`);
        res.json({ message :'Error while trying to register a new user' }).status(400);
    }
};


module.exports.login = async(req,res,next) =>{
    
    try{

        const { username,password } = req.body;

        const user = await UserModel.findOne({ username });
        if(!user){
            return res.json({ message:'This user does not exists !', status :false });
        }

        const isPasswordValid = await Bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.json({ message:'Username or password not correct !', status:false });
        }
        if(user && isPasswordValid){
            return res.json({ message:`Good morning ${username}`,status:true, token:generateToken(user.id,user.username,user.email) });
        }
    }catch(error){
        return res.json({ message :'Username or password not valid !', status: false });
    }
};


const generateToken = (id,username,email) =>{
    return jwt.sign({
        id,
        username,
        email 
    },process.env.SECRET_JWT_TOKEN,{
        expiresIn:'1d'
    })
};