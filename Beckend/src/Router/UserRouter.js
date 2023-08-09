const express = require('express')
const app = express()
const {HomeWeb,HomeReadBlog,LoginPages,CheckedToken,CheckedTokenTwo,LogoutPages} = require('../Controllers/UserControllers')
const  {ProfileData,PostProfile} = require('../Controllers/ProfileControllers')
const  {AddNewPost,ListPostsData,GetBlog,AddUpdatePost,DeletedBlog} = require('../Controllers/PostsControllers')
//Auth
const AuthUser = require('../Auth/Auth')

//multer
const multer = require('multer')
const storage = multer.memoryStorage()

const Upload = multer({storage:storage})

//router
// homeWeb
app.get('/home',HomeWeb)
//homeSearch
app.get('/homeread/:id',HomeReadBlog)
//LoginPages
app.get('/login',LoginPages)
//dasbordPages
app.get('/dasbord/:Username',CheckedToken)
//addpostpages
app.get('/addpost/:Username',CheckedToken)
//listPostPage
app.get('/listposts/:Username',CheckedToken)
//readblogPages
app.get('/readblog/:Username/:id',CheckedTokenTwo)
//updateblogPage
app.get('/updateblog/:Username/:id',CheckedTokenTwo)


//RouterPost || router one-one get data
app.get('/profile/:Username',ProfileData)
app.post('/profile/:Username',Upload.single('Avatar'),PostProfile)

//addpost
app.post('/addpost/:Username',Upload.single('Poster'),AddNewPost)

//router list
app.get('/listposts/card/:Username',ListPostsData)


//getblog 
app.get('/getblog/:Username/:id',GetBlog)

//updateblog
app.get('/updateblog/form/:Username/:id',GetBlog)
//postupdateblog
app.post('/updateblog/form/:Username/:id',Upload.single('Poster'),AddUpdatePost)

//deleteblog
app.delete('/deleteblog/:Username/:id',DeletedBlog)

//Logout
app.get('/logout',LogoutPages)
// login logout
app.use(AuthUser)

module.exports = app