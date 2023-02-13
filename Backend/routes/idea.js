const express = require('express')
const Schema = express.Router()
const verifyToken = require('../middleware/auth')
const Idea = require('../models/Idea')
const User = require('../models/User')
const router = require('./auth')

//@route POST api/ideas
//@desc Create post
//@access Private
// router.post('/', verifyToken, async(req, res) => {
//     const{ Title, Description, LastEdition } = req.body

//     if(!Title)
//     return res.status(400).json({success: false, message: 'Title is required!'})

//     try {
//         const newIdea = new Idea({
//             Title, 
//             Description, 
//             LastEdition, 
//             UserId: req.UserId,
//             CategoryId: '63e91195e2f49701e0175481'
//         })

//         await newIdea.save()

//         res.json({success: true, message: 'Successfully', post: newIdea})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({success: false, message:'Internla server error'})
//     }
// })

// // @route GET api/posts
// // @desc Get posts
// // @access Private
// router.get('/', verifyToken, async (req, res) => {
// 	try {
// 		const ideas = await Idea.find({ user: req.UserId }).populate('user', [
// 			'Name'
// 		])
// 		res.json({ success: true, ideas })
// 	} catch (error) {
// 		console.log(error)
// 		res.status(500).json({ success: false, message: 'Internal server error' })
// 	}
// })

// // @route PUT api/posts
// // @desc Update post
// // @access Private
// router.post('/:id', verifyToken, async(req, res) => {
//     const{ Title, Description, LastEdition } = req.body

//     if(!Title)
//     return res.status(400).json({success: false, message: 'Title is required!'})

//     try {
//         let updatedPost = {
//             Title,
//             Description,
//             LastEdition,
//         }

//         const postUpdateCondition = { _id: req.params.id, user: req.UserId }

// 		updatedPost = await Post.findOneAndUpdate(
// 			postUpdateCondition,
// 			updatedPost,
// 			{ new: true }
// 		)

//         // User not authorised to update post or post not found
// 		if (!updatedPost)
//         return res.status(401).json({
//             success: false,
//             message: 'Post not found or user not authorised'
//         })

//     res.json({
//         success: true,
//         message: 'Excellent progress!',
//         post: updatedPost
//     })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({success: false, message:'Internla server error'})
//     }
// })

// // @route DELETE api/posts
// // @desc Delete post
// // @access Private
// router.delete('/:id', verifyToken, async (req, res) => {
// 	try {
// 		const postDeleteCondition = { _id: req.params.id, user: req.UserId }
// 		const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

// 		// User not authorised or post not found
// 		if (!deletedPost)
// 			return res.status(401).json({
// 				success: false,
// 				message: 'Post not found or user not authorised'
// 			})

// 		res.json({ success: true, post: deletedPost })
// 	} catch (error) {
// 		console.log(error)
// 		res.status(500).json({ success: false, message: 'Internal server error' })
// 	}
// })

// // @route GET api/posts
// // @desc Get posts
// // @access Private
// router.get('/home', verifyToken, async (req, res) => {
// 	try {
        
// 		const ideas = await Idea.find().sort({createdAt: -1}).populate('Category', [
// 			'Title'
// 		])
// 		res.json({ success: true, ideas })
// 	} catch (error) {
// 		console.log(error)
// 		res.status(500).json({ success: false, message: 'Internal server error' })
// 	}
// })

module.exports = router

