const express = require('express')
const mongoose = require("mongoose")
const verifyToken = require('../middleware/auth')
const Idea = require('../models/Idea')
const Category = require('../models/Category')
const router = require('./auth')
const ObjectId = mongoose.Types.ObjectId

const now = new Date()
const options = { timeZone: 'Asia/Ho_Chi_Minh'}
const localTime = now.toLocaleString('en-US', options)
console.log(now)
// @route POST api/ideas
// @desc Create idea
// @access Private
router.post('/', verifyToken, async(req, res) => {
    const{ Title, Description, UserId, CategoryId } = req.body

    if(!Title)
    return res.status(400).json({success: false, message: 'Title is required!'})

    try {
        const newIdea = new Idea({
            Title, 
            Description, 
            LastEdition: now, 
            UserId: UserId,
            CategoryId: CategoryId
        })

        await newIdea.save()

        res.json({success: true, message: 'Successfully', idea: newIdea})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message:'Internla server error'})
    }
})

// @route GET api/idea
// @desc Get owner ideas
// @access Private
router.get('/', async (req, res) => {
	try {
		const ideas = await Idea.aggregate([
            {
                $match:{
                    'UserId' : ObjectId('63e90e898afc6bc67b547656'),
                }
            },
            {
              $lookup: {
                from: "commentideas",
                localField: "_id",
                foreignField: "IdeaId",
                as: "comments"
              }
            },

            {
              $lookup: {
                from: "users",
                localField: "UserId",
                foreignField: "_id",
                as: "users"
              }
            },
            {
              $lookup: {
                from: "categories",
                localField: "CategoryId",
                foreignField: "_id",
                as: "category"
              }
            },
            {
              $project: {
                _id: 1,
                Title: 1,
                Description: 1,
                LastEdition: 1,
                userPost: {
                    $map:{
                        input: "$users",
                        as: "user",
                        in: {
                          _id: "$$user._id",
                          Name: "$$user.Name",
                          Avatar: "$$user.Avatar",
                        }
                    } 
                },
                category: {
                    $map: {
                        input: "$category",
                        as: "category",
                        in:{
                          _id:"$$category._id",
                          Name:"$$category.Title"
                        }
                    }
                },
                comments: {
                    $map: {
                    input: "$comments",
                    as: "comment",
                    in: {
                        _id: "$$comment._id",
                        Content: "$$comment.Content",
                        LastEdition: "$$comment.LastEdition",
                        usercomment: {
                            $arrayElemAt: [
                                {
                                  $map: {
                                    input: {
                                      $filter: {
                                        input: "$users",
                                        as: "u",
                                        cond: { $eq: ["$$u._id", "$$comment.UserId"] }
                                      }
                                    },
                                    as: "u",
                                    in: {
                                      _id: "$$u._id",
                                      Name: "$$u.Name",
                                      Avatar: "$$u.Avatar"
                                    }
                                  }
                                },
                                0
                              ]
                        },
                    }
                }
            }
        }
    },
    {
        $sort: { LastEdition: -1 }
    }]);
		res.json({ success: true, ideas })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route PUT api/idea
// @desc Update idea
// @access Private
router.put('/:id',verifyToken, async(req, res) => {
    const{ Title, Description} = req.body

    if(!Title) 
    {
        return res.status(400).json({success: false, message: 'Title is required!',Title,Description})
    }
    try {
        let updatedIdea = {
            Title,
            Description,
            LastEdition: now
        }

        const ideaUpdateCondition = { _id: req.params.id }

		updatedIdea = await Idea.findOneAndUpdate(
			ideaUpdateCondition,
			updatedIdea,
			{ new: true }
		)

        // User not authorised to update post or post not found
		if (!updatedIdea)
        return res.status(401).json({
            success: false,
            message: 'Post not found or user not authorised'
        })

    res.json({
        success: true,
        message: 'Excellent progress!',
        post: updatedIdea
    })

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message:'Internla server error'})
    }
})

// @route DELETE api/idea
// @desc Delete idea
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const ideaDeleteCondition = { _id: req.params.id }
		const deletedIdea = await Idea.findOneAndDelete(ideaDeleteCondition)

		// User not authorised or post not found
		if (!deletedIdea)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({ success: true, post: deletedIdea })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route GET api/idea/home
// @desc Get all ideas
// @access Private
router.get('/home', verifyToken, async (req, res) => {
	try {
        // query to join cmt, user, idea
        const ideas = await Idea.aggregate([
            {
                $match:{}
            },
            {
              $lookup: {
                from: "commentideas",
                localField: "_id",
                foreignField: "IdeaId",
                as: "comments"
              }
            },

            {
              $lookup: {
                from: "users",
                localField: "UserId",
                foreignField: "_id",
                as: "users"
              }
            },
            {
              $lookup: {
                from: "categories",
                localField: "CategoryId",
                foreignField: "_id",
                as: "category"
              }
            },
            {
              $project: {
                _id: 1,
                Title: 1,
                Description: 1,
                LastEdition: 1,
                userPost: {
                    $map:{
                        input: "$users",
                        as: "user",
                        in: {
                          _id: "$$user._id",
                          Name: "$$user.Name",
                          Avatar: "$$user.Avatar",
                        }
                    } 
                },
                category: {
                    $map: {
                        input: "$category",
                        as: "category",
                        in:{
                          _id:"$$category._id",
                          Name:"$$category.Title"
                        }
                    }
                },
                comments: {
                    $map: {
                    input: "$comments",
                    as: "comment",
                    in: {
                        _id: "$$comment._id",
                        Content: "$$comment.Content",
                        LastEdition: "$$comment.LastEdition",
                        usercomment: {
                            $arrayElemAt: [
                                {
                                  $map: {
                                    input: {
                                      $filter: {
                                        input: "$users",
                                        as: "u",
                                        cond: { $eq: ["$$u._id", "$$comment.UserId"] }
                                      }
                                    },
                                    as: "u",
                                    in: {
                                      _id: "$$u._id",
                                      Name: "$$u.Name",
                                      Avatar: "$$u.Avatar"
                                    }
                                  }
                                },
                                0
                              ]
                        },
                    }
                }
            }
        }
    },
    {
        $sort: { LastEdition: -1 }
    }]);
        //query to show all category
        const category = await Category.find()
		res.json({ success: true, ideas,category})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router

