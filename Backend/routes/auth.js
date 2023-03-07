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

    if(!Username || !Password || !Role)return res.status(400).json({success:false,message:'Please enter full information'})
    try{ 
        const user = await Account.findOne({ Username })
        if(user) return res.status(400).json({success:false,message:'Username is exitsted'})
        const hashPassword = await argon2.hash(Password)
        const newAccount = new Account({Username, Password: hashPassword, Role})
        await newAccount.save()
        const accessToken = token.sign({userId: newAccount._id},process.env.ACCESS_TOKEN_SECRET)
        return res.json({success:true,message:'Successful',accessToken})
    }
    catch(error)
    {
        console.log(error.message)
		return res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

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
        ({Role, _id} = userValid)
        const accessToken = token.sign(
			{
                userId: userValid._id, 
                exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
                },
			process.env.ACCESS_TOKEN_SECRET
		)
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            accessToken,
            userId: _id,
            Role
        })
    }
    catch(error)
    {
        console.log(error)
		return res.status(500).json({ success: false, message: 'Internal server error'})
    }
})

//  @route POST api/auth/delete
//  @desc delete
//  @access Public

router.delete('/:id', async (req, res) => {
	try {
		const accountDeleteCondition = { _id: req.params.id }
		const deletedAccount = await Account.findOneAndDelete(accountDeleteCondition)

		if (!deletedAccount)
			return res.status(401).json({
				success: false,
				message: 'Account not found or user not authorised'
			})

		res.json({ success: true, deletedAccount: deletedAccount })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router