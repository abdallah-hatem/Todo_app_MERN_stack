const express = require('express')
const cors = require('cors')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()


app.use(cors())
app.use(express.json())
app.use('/api/v1/tasks', tasks)



const port = 4000
async function start(params) {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}


start()