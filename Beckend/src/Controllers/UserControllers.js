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




module.exports = {HomeWeb,HomeSearch,LoginPages}