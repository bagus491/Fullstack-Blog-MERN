//expres first setup
const express = require('express')
const app = express()
const port = 5000


//setup middleware ==> seconds
const cors = require('cors')
app.use(cors())

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

const cookieparser = require('cookie-parser')
app.use(cookieparser('secret'))

const morgan = require('morgan')
app.use(morgan('dev'))


//database
require('../Beckend/src/Db/Db')



app.listen(port, () => {
    console.log(`server berjalan di port ${port}`)
})