const express = require('express')
const app = express()
const {HomeWeb,HomeSearch} = require('../Controllers/UserControllers')


//router
// homeWeb
app.get('/home',HomeWeb)
//homeSearch
app.get('/homesearch',HomeSearch)







module.exports = app