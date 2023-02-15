const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const token = require('jsonwebtoken')
const Account = require('../models/Account')


//  @route POST api/auth/createA
//  @desc Create Account
//  @access Private 
router.post('/create', async(req,res)=> {
    const {Username, Password,Role} = req.body

    if(!Username || !Password)return res.status(400).json({sucsess:false,message:'Please enter full information'})
    try{
        const user = await Account.findOne({ Username })
        if(user) return res.status(400).json({sucsess:false,message:'Username is exitsted'})
        const hashPassword = await argon2.hash(Password)
        const newAccount = new Account({Username, Password: hashPassword, Role})
        await newAccount.save()
        const accessToken = token.sign({userId: newAccount._id},process.env.ACCESS_TOKEN_SECRET)
        return res.json({sucsess:true,message:'Successful',accessToken})
    }
    catch(error)
    {
        console.log(error.message)
		return res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// // insert data
// router.post('/createAll',async(req,res)=>{
//     const hashPassword = await argon2.hash("123456")
//     const account = [
//         { "Username": "phuongAnh1",
//         "Password": hashPassword,
//         "Role": "Staff" },
//         { "Username": "PhuTrongNon1",
//         "Password": hashPassword,
//         "Role": "Staff" },
//         { "Username": "DUcHung1",
//         "Password": hashPassword,
//         "Role": "QAM" }
//     ];

//     Account.create(account, function(error, documents) {
//         if (error) {
//             console.error(error);
//         } else {
//             console.log("Data inserted successfully");
//         }
//     });
// })
//  @route POST api/auth/login
//  @desc Login
//  @access Public

router.post('/login',async(req,res)=>{

    const {Username,Password} = req.body
    if(!Username || !Password)
    {
        return res.status(400).json({success:false,message:"Please enter full information !!"})
    } 
    try{
        const userValid = await Account.findOne({Username})
        if(!userValid) {
            return res.status(400).json({success:false,message:"Username or password is invalid"})
        }
        const passwordValid = await argon2.verify(userValid.Password, Password)
        if(!passwordValid)
        {
            return res.status(400).json({success:false,message:"Username or password is invalid"})
        }
        ({Role} = userValid)
        const accessToken = token.sign(
			{ userId: userValid._id },
			process.env.ACCESS_TOKEN_SECRET
		)
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            accessToken,
            Role
        })
    }
    catch(error)
    {
        console.log(error)
		return res.status(500).json({ success: false, message: 'Internal server error'})
    }
})

module.exports = router