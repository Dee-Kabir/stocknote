const User = require('../models/user')
const jwt =  require('jsonwebtoken')
const expressJwt = require('express-jwt')


exports.register = async(req, res) => {
    const { email} = req.body;
    let userExist = await User.findOne({email}).exec()
    if(userExist) return res.json({
        error: 'Email already taken'
    })

    const user = new User(req.body)
    try {
        await user.save()
        return res.json({
            message: "User registerd Successfully."
        })
    }catch(err){
        return res.status(400).json({
            error: 'Error!! try again'
        })
    }
}

exports.login = async(req,res) => {
    const {email, password} = req.body
    try {
        let user = await User.findOne({email}).exec();
        if(!user) {
            return res.json({
                error: 'Email not Found!! try again'
            })
        } 
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET,{
            expiresIn: '1d'
        })
        
        user.comparePassword(password, (err, match) => {
            if(err) {
                return res.json({
                    error: "Email or Password not exists"
                })
            }
            user.password = undefined
            res.json({token, user});

        })
    }catch(err) {
        return res.status(400).json({
            error: 'Error!! try again'
        })
    }
}
exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
})