const express = require('express')
const Schema = express.Router()
const verifyToken = require('../middleware/auth')
const Category = require('../models/Category')
const router = require('./auth')


router.get('/', async (req, res) => {
	try {
		const categories = await Category.find()

		res.json({ success: true, categories })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router
