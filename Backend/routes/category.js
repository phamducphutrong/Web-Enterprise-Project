const verifyToken = require('../middleware/auth');
const Category = require('../models/Category');
const router = require('./auth');

//api to get all
router.get('/showAll', async (req, res) => {
	try {
		const categories = await Category.find()

		res.json({ success: true, categories })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

//api to create
router.post('/newCategory', async (req, res) => {
	const { Title, Description, DateInnitiated, Status } = req.body
	if (!Title || !Status || !DateInnitiated || !Description) return res.status(400).json({ success: false, message: "Please enter full information", Title, Description, DateInnitiated, Status })
	const inValidTitle = await Category.findOne({ Title })
	if (inValidTitle) return res.status(400).json({ success: false, message: "Title is exitsted" })
	try {
		const newCategory = new Category({
			Title,
			Description,
			DateInnitiated,
			Status
		})
		await newCategory.save()
		return res.json({ success: true, message: 'Successfully', category: newCategory })
	}
	catch (error) {
		console.log(error.message)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// router.get('/update/:id', async (req, res) => {
// 	try {
// 		const id = req.params.id
// 		const validId = await Category.findOne({ id })
// 		if (!validId) return res.status(400).json({ success: false, message: "Not found this category" })
// 		else return res.json({ success: true, validId })
// 	}
// 	catch (error) {
// 		console.log(error.message)
// 		res.status(500).json({ success: false, message: 'Internal server error' })
// 	}
// })

//api to update
router.put('/update/:id', async (req, res) => {
	const { Title, Description, Status } = req.body
	if (!Title || !Status) return res.json({ success: false, message: "Please enter full information" })
	const id = req.params.id
	const validId = await Category.findOne({ id })
	if (!validId) return res.status(400).json({ success: false, message: "Not found this category" })
	try {
		let updatedCategory = {
			Title,
			Description,
			Status
		}

		const categoryUpdateCondition = { _id: req.params.id }

		updatedCategory = await Category.findOneAndUpdate(
			categoryUpdateCondition,
			updatedCategory,
			{ new: true }
		)

		// User not authorised to update post or post not found
		if (!updatedCategory)
			return res.status(401).json({
				success: false,
				message: 'Category not found or user not authorised'
			})

		res.json({
			success: true,
			message: 'Excellent progress!',
			category: updatedCategory
		})
	}
	catch (error) {
		console.log(error.message)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

//api to delete
router.delete('/delete/:id', async (req, res) => {
	try {
		const categoryDeleteCondition = { _id: req.params.id }
		const deletedCategory = await Category.findOneAndDelete(categoryDeleteCondition)

		// User not authorised or post not found
		if (!deletedCategory)
			return res.status(401).json({
				success: false,
				message: 'Category not found or user not authorised'
			})

		res.json({ success: true, category: deletedCategory })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router