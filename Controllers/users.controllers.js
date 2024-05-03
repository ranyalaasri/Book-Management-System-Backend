
const { uuid } = require("uuidv4");
const { axiosRegisterUser } = require("../api/users");
const { hashPassword } = require("../Helpers/Hashing");
const {MatchedPassword,findUser,}= require ('../Helpers/userQuery');
const {generateToken} = require("../Helpers/jwt");




exports.renderLogin = async (req,res) => {
    res.render('login')
}

exports.renderRegister = async (req,res) => {
    res.render('register')
}

exports.renderProfile = (req, res) =>{
    res.render('profile');
}
exports.registerUser = async (req, res) => {   
    try{
        const { username, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const result  = await axiosRegisterUser({username,email,password:hashedPassword,authorId:uuid()});
        if(!result) return res.status(400).json({message:"Something went wrong"})
        res.status(302).redirect('/login')

    }catch(err){
        return res.status(501).send('server error')
    }
}



exports.loginUser =async (req, res) =>{
    try{
        const {email,password} = req.body;

        const user = await findUser(email)
        if(!user) return res.status(400).json({message:"User not found"})
        const checked =await  MatchedPassword(password,user.password)
        if(!checked) return res.status(400).json({message:"Incorrect Password"}) 
        delete user.password
        delete user.id
        const token = await generateToken(user)
        res.cookie('tokenAuth',token)    
        res.status(302).redirect('/user/profile')    

    }catch(err){
      console.log(err)
    }
}
