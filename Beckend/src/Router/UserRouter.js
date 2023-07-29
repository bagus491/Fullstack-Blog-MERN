const express = require('express')
const app = express()
const {HomeWeb,HomeSearch,LoginPages,DasbordPages,LogoutPages} = require('../Controllers/UserControllers')

//Auth
const AuthUser = require('../Auth/Auth')

//router
// homeWeb
app.get('/home',HomeWeb)
//homeSearch
app.get('/homesearch',HomeSearch)
//LoginPages
app.get('/login',LoginPages)
//dasbordPages
app.get('/dasbord/:Username',DasbordPages)

//Logout
app.get('/logout',LogoutPages)
app.use(AuthUser)

module.exports = app