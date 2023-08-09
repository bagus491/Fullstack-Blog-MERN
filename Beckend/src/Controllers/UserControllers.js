// middleware
const jwt = require('jsonwebtoken')
const secret = '!@#%$^&daqwerg!@234551'

const {CheckUser,CheckPostsByid,GetListPost} = require('../Utils/Index')


//first
const HomeWeb = async (req,res) => {
    try{
        const arrayData = await GetListPost()
        const dataPost = await Promise.all(
            arrayData.map((items) => {
                const {_id,Username,Title,Preparagraf,Paragraf,Author,ImageFile,ImageType} = items
                
                //decoded
                const imageChange = ImageFile.toString('base64')
                const ImagePath = `data:${ImageType};base64,${imageChange}`
                return {_id,Username,Title,Preparagraf,Author,Paragraf,ImagePath}
            })
            )
            res.status(200).json({msg : 'success', data:dataPost})
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }   
}

//seconds
const HomeReadBlog = async (req,res) => {
    try{
       const getPost = await CheckPostsByid(req.params.id)

       if(!getPost){
       return  res.status(401).json({msg : 'Not Content'})
       }

       const {Username,Title,Preparagraf,Paragraf,Author,PostDate,ImageFile,ImageType} = getPost

       const ImageChange = ImageFile.toString('base64')
       const ImagePath = `data:${ImageType};base64,${ImageChange}`

       const dataArray = [{Username,Title,Preparagraf,Paragraf,Author,PostDate,ImagePath}]
       res.status(200).json({msg : 'Success', data:dataArray})
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

//third --edited
const LoginPages = async (req,res) => {
    try{
    const token = req.headers.authorization
    if(!token){
        return res.status(401).json({msg: 'Not Authorization'})
    }
        jwt.verify(token,secret,async (err,decoded) => {
          if(err){
              return res.status(401).json({msg: 'Not Authorization'})
          }
          
          const Username = decoded.Username
          const dataOk = await CheckUser(Username)
          if(!dataOk){
              return res.status(401).json({msg : 'Not Authorization'})
          }
  
          res.status(200).json({msg: 'Valid',Username})
        })
      }catch(error){
              res.status(500).json({msg : 'Internal Server Error'})
          }
    };


//checkedToken for Pages
const CheckedToken = async(req,res)=> {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        //verify
        jwt.verify(token,secret,async(err,decoded) => {
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

            res.status(200).json({msg : 'Valid'})
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

//checkedTokenV2 for pages readblog and updateblog
const CheckedTokenTwo = async(req,res)=> {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        //verify
        jwt.verify(token,secret,async(err,decoded) => {
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

            const checkPost = await CheckPostsByid(req.params.id)
            if(!checkPost){
                return res.status(203).json({msg : 'Not Authorization'})
            }

            res.status(200).json({msg : 'Valid'})
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

//logout
const LogoutPages = async(req,res) => {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg: 'Not Authorization'})
        }
        res.clearCookie('token')
        res.status(200).json({msg: 'success logout'}) 
    }catch(error){
        res.status(500).json({msg: 'Internal Server Error'})
    }
}


module.exports = {HomeWeb,HomeReadBlog,LoginPages,LogoutPages,CheckedToken,CheckedTokenTwo}