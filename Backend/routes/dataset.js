const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const Account = require('../models/Account')
const User = require('../models/User')
const Category = require('../models/Category')
const Idea = require('../models/Idea')
const CommentIdea = require('../models/CommentIdea')
const AcademicYEar = require('../models/Academic')

router.post('/createAccount',async(req,res)=>{
    const hashPassword = await argon2.hash("123456")
    const account = [
        { "Username": "phuongAnh1",
        "Password": hashPassword,
        "Role": "Staff" },
        { "Username": "PhuTrongNon1",
        "Password": hashPassword,
        "Role": "Staff" },
        { "Username": "DUcHung1",
        "Password": hashPassword,
        "Role": "QAM" }
    ];

    Account.create(account, function(error, documents) {
        if (error) {
            console.error(error);
        } else {
            console.log("Data inserted successfully");
        }
    });
})


router.post('/createUserProfile',async(req,res)=>{
    const user = [
        { "Name": "Le Thi Phuong Anh2", "Gender": "Female", "PhoneNumber":"0962986806", "DoB": "2002-12-10", "Email":"phuongan2h@gmail.com", "Department":"Marketing","Avatar":"../Public/Avatar/avt.jpg","AccountUsername":"63e7aa0998d9661602bb0a5c" }
    ];
    User.create(user, function(error, documents) {
        if (error) {
            console.error(error);
        } else {
            console.log("Data inserted successfully");
        }
    });
})

router.post('/createCategory',async(req,res)=>{
    const category = [
        { "Title": "F99", "Description": "Tín dụng trắng", "DateInnitiated":"2023-02-04", "Status":"Closed" }
    ];
    Category.create(category, function(error, documents) {
        if (error) {
            console.error(error);
        } else {
            console.log("Data inserted successfully");
        }
    });
})

router.post('/createIdea',async(req,res)=>{
    const idea = [
        { "Title": "Marketing in 2023 of UoG", "Description": "About marketingggggggggg", "DateEdition":"2023-02-12","CategoryId":"63e91195e2f49701e0175481", "UserId":"63e7aa8f4077f28f87bdb51e" }
    ];
    Idea.create(idea, function(error, documents) {
        if (error) {
            console.error(error);
        } else {
            console.log("Data inserted successfully");
        }
    });
})

router.post('/createComment',async(req,res)=>{
    const comment = [
        { "Content": "Bai viet hay vl", "UserId": "63e90e898afc6bc67b547656","IdeaId":"63f466c857ae5bdd5d301350","LastEdition":"2023-01-01" }
    ];
    CommentIdea.create(comment, function(error, documents) {
        if (error) {
            console.error(error);
        } else {
            console.log("Data inserted successfully");
        }
    });
})
router.post('/createAcademicYear',async(req,res)=>{
    const year = [{"Year":"2023","FirstClosureDate":"2023-02-01","LastClosureDate":"2023-12-31"}]
    AcademicYEar.create(year,function(error,documents){
        if (error) {
            console.error(error);
        } else {
            console.log("Data inserted successfully");
        }
    })
})
module.exports = router