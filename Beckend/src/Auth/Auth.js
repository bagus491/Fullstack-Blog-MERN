const express = require('express')
const app = express()
const {UsersNew,CheckUserNew,CheckUser} = require('../Utils/Index')

//Needed
// middleware
const jwt = require('jsonwebtoken')
const secret = '!@#%$^&daqwerg!@234551'

const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

//validator
const {validationResult} = require('express-validator')

//Register

const AddUser = async (req,res) => {
    try{
        const {Username,Password,Email} = req.body
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.send(error.array())
        }
            const newPassword = bcrypt.hashSync(Password,salt)
            const getSchema = UsersNew(Username,newPassword,Email)
            const saveUsers = await getSchema.save()
            if(saveUsers){
                res.status(201).json({msg: 'Success Register'})
            }
        
    }catch{
        res.status(500).json({msg: 'Internal Server Error'})
    }
}

app.post('/register',CheckUserNew,AddUser)

//login
const LoginUser = async (req,res) => {
    try{
        const {Username,Password} = req.body 
        const dataOk = await CheckUser(Username)
        if(!dataOk){
            return res.status(401).json({msg: 'Not Authorization'})
        }

        const passOk = bcrypt.compareSync(Password,dataOk.Password)
        if(!passOk){
            return res.status(401).json({msg: 'Not Authorization'})
        }
        
        jwt.sign({Username, id:dataOk._id},secret,{expiresIn: '1h'}, (err,token) => {
            if(err){
                return res.status(401).json({msg: 'Not Authorization'})
            }
            res.cookie('token',token);
            res.status(200).json({msg: 'success login',token,Username})
        })

    }catch{
        res.status(500).json({msg: 'Internal Server Error'})
    }   
}

app.post('/login',LoginUser)


module.exports  = app