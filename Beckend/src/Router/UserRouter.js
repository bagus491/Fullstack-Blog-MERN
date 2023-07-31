const express = require('express')
const app = express()
const {HomeWeb,HomeSearch,LoginPages,DasbordPages,LogoutPages,AddPostsPages,ListPostsPages,SettingPages} = require('../Controllers/UserControllers')
const  {ProfilePages} = require('../Controllers/ProfileControllers')
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
//addpostpages
app.get('/addpost/:Username',AddPostsPages)
//listPostPage
app.get('/listposts/:Username',ListPostsPages)
//SettingsPages
app.get('/settings/:Username',SettingPages)

//RouterPost
app.get('/profile/:Username',ProfilePages)

//Logout
app.get('/logout',LogoutPages)
app.use(AuthUser)

module.exports = app