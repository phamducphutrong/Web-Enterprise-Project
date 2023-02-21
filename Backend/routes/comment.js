const express = require('express')
const verifyToken = require('../middleware/auth')
const Comment = require('../models/CommentIdea')
const router = require('./auth')

router.post('/createCMT', verifyToken, async(req, res) => {
    const{ Content, UserId, IdeaId } = req.body

    if(!Content)
    return res.status(400).json({success: false, message: 'Content is required!'})

    try {
        const newComment = new Comment({
            Content, 
            UserId: UserId,
            IdeaId: IdeaId //'63e912385203710add850c31'
        })

        await newComment.save()

        res.json({success: true, message: 'Sent', post: newComment})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message:'Internal server error'})
    }
})

router.get('/cmt', async (req, res) => {
	try {
		const comment = await Comment.find({ user: req.UserId }).populate('UserId', 'Name')
		res.json({ success: true, comment })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route PUT api/idea
// @desc Update idea
// @access Private
router.put('/updateCMT/:id',verifyToken, async(req, res) => {
    const{ Content} = req.body

    if(!Content) 
    {
        return res.status(400).json({success: false, message: 'Title is required!',Title,Description})
    }
    try {
        let updatedComment = {
            Content
        }

        const commentUpdateCondition = { _id: req.params.id }

		updatedComment = await Comment.findOneAndUpdate(
			commentUpdateCondition,
			updatedComment,
			{ new: true }
		)

        // User not authorised to update post or post not found
		if (!updatedComment)
        return res.status(401).json({
            success: false,
            message: 'Comment not found or user not authorised'
        })

    res.json({
        success: true,
        message: 'Excellent progress!',
        post: updatedComment
    })

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message:'Internla server error'})
    }
})

router.delete('/deleteCMT/:id', verifyToken, async (req, res) => {
	try {
		const commentDeleteCondition = { _id: req.params.id }
		const deletedComment = await Comment.findOneAndDelete(commentDeleteCondition)

		// User not authorised or post not found
		if (!deletedComment)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({ success: true, post: deletedComment })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})
module.exports = router