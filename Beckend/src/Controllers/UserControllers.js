// middleware
const jwt = require('jsonwebtoken')
const secret = '!@#%$^&daqwerg!@234551'

const {CheckUser,CheckPostsByid} = require('../Utils/Index')

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


module.exports = {HomeWeb,HomeSearch,LoginPages,LogoutPages,CheckedToken,CheckedTokenTwo}