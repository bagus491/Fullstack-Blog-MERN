const {CheckUser,NewPost,CheckPosts,GetListPost,CheckPostsByid} = require('../Utils/Index')

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

//listpost
const ListPostsData = async (req,res) => {
  try{
    const token = req.headers.authorization
    if(!token){
        return res.status(401).json({msg : 'Not Authorization'})
    }

    jwt.verify(token,secret, async (err,decoded) => {
        if(err){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        const dataOk = await CheckUser(req.params.Username)
        if(!dataOk){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        const decodedUser = decoded.Username
        if(dataOk.Username !== decodedUser){
            return res.status(401).json({msg : 'Not Authorization'})
        }
        //this array
        const listDataPost = await GetListPost()
        
        //filterdata
        const arrayFilter = listDataPost.filter((e) => e.Username === decoded.Username)
        if(!arrayFilter || arrayFilter.length == 0){
            return res.status(203).json({msg : 'No Content'})
        }

        //changesImageData or create new array
        const NewArray = await Promise.all(
            arrayFilter.map((items) => {
                const {_id,Username,Title,Preparagraf,Paragraf,Author,PostDate,ImageFile,ImageType} = items
                //decodedImage
                const decodedImage = ImageFile.toString('base64')
                const ImagePath = `data:${ImageType};base64,${decodedImage}`
                return {_id,Username,Title,Preparagraf,Paragraf,Author,PostDate,ImagePath}
            })
        )
        
        res.status(200).json({msg : 'Valid', data:NewArray})
    })
  }catch(error){
    res.status(500).json({msg : 'Internal Server Error'})
  }
} 


//readblog
const GetBlog = async (req,res) => {
    try{
        const token = req.headers.token
        if(!token){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        jwt.verify(token,secret,async (err,decoded) => {
            if(err){
                return res.status(401).json({msg : 'Not Authorization'})
            }
            
            const dataOk = await CheckUser(req.params.Username)
            const decodedUser = decoded.Username
            if(!dataOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            if(dataOk.Username !== decodedUser){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //getDataPosts
            const newArray = await GetListPost()

            //filterArray
            const filterArray = newArray.filter((e) => e.Username === decodedUser)
            if(!filterArray || filterArray.length == 0){
                return res.status(401).json({msg : 'Not Authorization'})
            }

           //getpostsby id
            const checkedPost = await CheckPostsByid(req.params.id)
            if(!checkedPost){
                return res.status(203).json({msg : 'No Content'})
            }
            
            //descturction
            const {Username,Title,Paragraf,Author,PostDate,ImageFile,ImageType} = checkedPost

            //decodedImage
            const decodedImage = ImageFile.toString('base64')
            const ImagePath = `data:${ImageType};base64,${decodedImage}`

            //makeNewArrayAsRespone ==> array of object
            const dataRespone = [{Username,Title,Paragraf,Author,PostDate,ImagePath}]

            //res
            res.status(200).json({msg : 'valid', data:dataRespone})
            
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

//updateblog



module.exports = {AddNewPost,ListPostsData,GetBlog}