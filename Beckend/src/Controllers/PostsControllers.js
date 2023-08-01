const {CheckUser,NewPost,CheckPosts} = require('../Utils/Index')

// middleware
const jwt = require('jsonwebtoken')
const secret = '!@#%$^&daqwerg!@234551'

//add post
const AddNewPost = async (req,res) => {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg: 'Not Authorization'})
        }

        jwt.verify(token,secret,async (err,decoded) => {
            if(err) {
                return res.status(401).json({msg: 'Not Authorization'})
            }

            const dataOk = await CheckUser(req.params.Username)
            const decodedUser = decoded.Username
            if(!dataOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            if(dataOk.Username !== decodedUser){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            const {Title,Preparagraf,Paragraf,Author} = req.body
            const PostDate = new Date()
            
            const PostOk = await CheckPosts(Title)
            if(PostOk){
                res.json({msg : 'Title Already  Use'})
                return false
            }

            const SavePost = NewPost(decodedUser,Title,Preparagraf,Paragraf,Author,PostDate,req.file)
            const savedPost = await SavePost.save()
            if(!savedPost){
                return false
            }

            res.status(201).json({msg : 'Success Addpost'})

        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}


module.exports = {AddNewPost}