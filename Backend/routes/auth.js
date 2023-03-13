const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const token = require('jsonwebtoken')
const Account = require('../models/Account')
const User = require('../models/User')
//  @route POST api/auth/getAll
//  @desc Get all accounts
//  @access Private 
router.get('/listAccount', async (req, res) => {
    const accounts = await Account.find({}, { Username: 1, Role: 1 });
    if (!accounts)
        return res.status(401).json({
            success: false,
            message: 'Not any account'
        })
    res.json({ success: true, accounts })
})


//  @route POST api/auth/create
//  @desc Create Account
//  @access Private 
router.post('/create', async (req, res) => {
    const { Username, Password, Role } = req.body

    if (!Username || !Password || !Role) return res.status(400).json({ success: false, message: 'Please enter full information' })
    try {
        const user = await Account.findOne({ Username })
        if (user) return res.status(400).json({ success: false, message: 'Username is exitsted' })
        const hashPassword = await argon2.hash(Password)
        const newAccount = new Account({ Username, Password: hashPassword, Role })
        const newUser = new User({
            Name: "User",
            Gender: "Male",
            PhoneNumber: "0000000000",
            DoB: "01-01-1991", 
            Email: "user@gmail.com",
            Department: "IT",
            Avatar: "User",
            AccountId: newAccount
        })
        await newAccount.save()
        await newUser.save()
        const accessToken = token.sign({ userId: newAccount._id && newUser._id }, process.env.ACCESS_TOKEN_SECRET)
        return res.json({ sucsess: true, message: 'Successful', accessToken, newAccount })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//  @route POST api/auth/login
//  @desc Login
//  @access Public
router.post('/login', async (req, res) => {

    const { Username, Password } = req.body
    if (!Username || !Password) {
        return res.status(400).json({ success: false, message: "Please enter full information !!" })
    }
    try {
        const userValid = await Account.findOne({ Username })
        if (!userValid) {
            return res.status(400).json({ success: false, message: "Username or password is invalid" })
        }
        ({ Role, _id } = userValid)
        const accessToken = token.sign(
            {
                accountId: _id,
                exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
            },
            process.env.ACCESS_TOKEN_SECRET
        )
        const userArray = await User.find({ userValid })
        const userObject = userArray.pop()
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            accessToken,
            accountId: _id,
            Role,
            user: userObject
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//  @route POST api/auth/delete
//  @desc delete
//  @access Private
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