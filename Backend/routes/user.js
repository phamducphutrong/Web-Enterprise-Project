const mongoose = require("mongoose")
const verifyToken = require('../middleware/auth')
const router = require('./auth')
const User = require('../models/User')

// router.get('/users/:id', verifyToken, (req, res) => {
//     const userId = req.params.userId;

//     User.findById(userId, (err, user) => {
//       if (err) {
//         res.status(500).send(err);
//         return;
//       }
  
//       if (!user) {
//         res.status(404).send('User not found');
//         return;
//       }
  
//       res.send(user);
//     });
// });

router.get('/myprofile/:id', verifyToken, async (req, res) => {
	try {
        const profile = { _id: req.params.id }
		const user = await User.findOne(profile)
		res.json({ success: true, user })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.put('/updateProfile/:id',verifyToken, async(req, res) => {
    const{ Name, Gender, PhoneNumber, DoB, Email, Department, Avatar} = req.body
    // if(!Title) 
    // {
    //     return res.status(400).json({success: false, message: 'Title is required!',Title,Description})
    // }
    try {
        let updatedProfile = {
            Name,
            Gender,
            PhoneNumber,
            DoB,
            Email,
            Department,
            Avatar,
        }
        const profileUpdateCondition = { _id: req.params.id }
		updatedProfile = await User.findOneAndUpdate(
			profileUpdateCondition,
			updatedProfile,
			{ new: true }
		)
        // User not authorised to update post or post not found
		if (!updatedProfile)
        return res.status(401).json({
            success: false,
            message: 'Profile not found or user not authorised'
        })

    res.json({
        success: true,
        message: 'Excellent progress!',
        post: updatedProfile
    })

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message:'Internal server error'})
    }
})

router.get('/search/:keyword', verifyToken, (req, res) => {
    const keyword = req.params.keyword;

    User.find({ $or: [
        { Name: { $regex: keyword} },
    ]}, (err, users) => {
        if (err) {
        res.status(500).send(err);
        return;
        }
    res.send(users);
    });
});


module.exports = router
