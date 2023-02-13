require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth');
const datasetRouter = require('./routes/dataset')
const ideaRouter = require('./routes/idea')
const cateRouter = require('./routes/category')

const connectDB = async() => {
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clusterwebenterprisepro.9brgsqy.mongodb.net/?retryWrites=true&w=majority`)
        console.log('Database is connected')
    }
    catch(error){
        console.log('Connecting to DB is failed')
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()
const app = express()
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/dataset', datasetRouter)
app.use('/api/idea',ideaRouter)
app.use('/api/category',cateRouter)

const PORT = 5000
app.listen(PORT, () => console.log('running'))