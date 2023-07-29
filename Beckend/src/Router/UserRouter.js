const express = require('express')
const app = express()
const {HomeWeb} = require('../Controllers/UserControllers')


//router
// homeWeb
app.get('/home',HomeWeb)








module.exports = app