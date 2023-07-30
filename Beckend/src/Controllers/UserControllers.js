// middleware
const jwt = require('jsonwebtoken')
const secret = '!@#%$^&daqwerg!@234551'

const {CheckUser} = require('../Utils/Index')

//first
const HomeWeb = (req,res) => {
    try{
        res.send('hello world')
    }catch{
        res.send('hello world')
    }   
}

//seconds
const HomeSearch = (req,res) => {
    try{
        res.send('hello world search')
    }catch{
        res.send('hello world')
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

//four 
const DasbordPages = async (req,res)  => {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg: 'Not Authorization'})
        }

        jwt.verify(token,secret, async(err,decoded) => {
            if(err){
                return  res.status(401).json({msg: 'Not Authorization'})
            }

            const dataOk = await CheckUser(req.params.Username)
            const UserDecoded = decoded.Username
            if(!dataOk){
                return res.status(401).json({msg: 'Not Authorization'})
            }
            //validate User decoded and User Data
            if(dataOk.Username === UserDecoded){
                res.status(200).json({msg: 'valid'})
            }else{
                return res.status(401).json({msg: 'Not Authorization'})
            }
        })
    }catch{
        res.status(500).res.json({msg :'Internal Server Error'})
    }
}

//five
const AddPostsPages = async (req,res) => {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        jwt.verify(token,secret,async(err,decoded) => {
            if(err){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            const Username = req.params.Username
            const dataOk = await CheckUser(Username)
            if(!dataOk){
                return res.status(401).json({msg : 'Not Authorizaion'})
            }
            res.status(200).json({msg: 'valid'})
        })
    }catch(error){
        res.status(500).json({msg: 'Internal Server Error'})
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


module.exports = {HomeWeb,HomeSearch,LoginPages,DasbordPages,LogoutPages,AddPostsPages}