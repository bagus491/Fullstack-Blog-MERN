const express = require('express')
const app = express()
const {UsersNew} = require('../Utils/Index')

//Needed
// middleware
const jwt = require('jsonwebtoken')
const secret = '!@#%$^&daqwerg!@234551'

const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

//validator
const {check,ValidationResult} = require('express-validator')






module.exports  = app