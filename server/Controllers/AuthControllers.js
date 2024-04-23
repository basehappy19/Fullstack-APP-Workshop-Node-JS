const User = require('../Models/UsersModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { notifyLine, getIPClient } = require('../Functions/Notify')


const tokenLine = ''

exports.register = async(req,res) => {
    try {

        // Check User

        const {name, password} = req.body

        var user = await User.findOne({name})
        if(user){
            return res.send('User Already Exists').status(400)
        } 
        // Encrypt
        const salt = await bcrypt.genSalt(10)
        user = new User({
            name,
            password
        })
        user.password = await bcrypt.hash(password, salt)


        // Save
        await user.save()
        res.send('Register Success!!')
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
}

exports.login = async(req,res) => {
    try {

        // Check Password Correct?
        const ip = await getIPClient(req)
        const { name , password } = req.body
        var user = await User.findOneAndUpdate({name}, {ip:ip}, {new:true})
        
        if(user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).send("Password Invalid!!")
            }

            // Payload

            var payload = {
                user:{
                    name:user.name,
                    role:user.role
                }
            }

            // notify
            const text = 'User ' + user.name + ' Login ที่ IPAddress : ' + ip
            await notifyLine(tokenLine,text)


            // Generate Token
    
            jwt.sign(payload,'jwtsecret',{ expiresIn: '1d'},(err,token)=>{
                if(err) throw err;
                res.json({token,payload})
            })
            
        } else {
            const text = 'User ' + name + ' พยายาม Login ที่ IPAddress : ' + ip
            await notifyLine(tokenLine,text)
            res.status(400).send("User Not Found!!!")
        }

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
}

exports.loginLine = async(req,res) => {
    try {
        
        const { userId,displayName,pictureUrl } = req.body;
        var data = {
            name: userId,
            displayName:displayName,
            picture:pictureUrl,
        }
        // Check

        var user = await User.findOneAndUpdate({name:userId},{new:true})
        if(user){
            console.log('User Updated!!!');
        }else{
            user = new User(data)
            await user.save()
        }

        // Payload

        var payload = {
            user
        }

        // Generate Token
        jwt.sign(payload,'jwtsecret',{ expiresIn: '1d'},(err,token)=>{
            if(err) throw err;
            res.json({token,payload})
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
}

exports.loginFacebook = async(req,res) => {
    try {
        
        const { userID,name,email } = req.body;
        var data = {
            name: userID,
            displayName:name,
            email:email,
        }
        // Check

        var user = await User.findOneAndUpdate({name:userID}, {new:true})
        if(user){
            console.log('User Updated!!!');
        }else{
            user = new User(data)
            await user.save()
        }

        // Payload

        var payload = {
            user,
        }

        // Generate Token
        jwt.sign(payload,'jwtsecret',{ expiresIn: '1d'},(err,token)=>{
            if(err) throw err;
            res.json({token,payload})
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
}

exports.currentUser = async (req,res)=> {
    try {
        console.log('currentUser',req.user);
        const user = await User.findOne({name:req.user.name})
        .select('-password')
        .exec()
        res.send(user)
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error")
    }
}
