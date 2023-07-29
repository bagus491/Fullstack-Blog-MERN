const express = require('express')
const app = express()
const {HomeWeb,HomeSearch,LoginPages} = require('../Controllers/UserControllers')


//router
// homeWeb
app.get('/home',HomeWeb)
//homeSearch
app.get('/homesearch',HomeSearch)
//LoginPages
app.get('/login',LoginPages)






module.exports = app