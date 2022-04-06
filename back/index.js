const express = require('express')

const cors = require('cors')

const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router/index')

const app = express()

const URL = process.env.URL
const PORT = process.env.PORT || 4000


app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/app', router)
 
const start = async ()=>{
    try {
        await mongoose.connect(URL)
        app.listen(PORT, ()=>{
            console.log('SERVER IS RUNNING AT: ', PORT)
        })
        
    } catch (error) {
        console.log(error)
    }
}

start()
