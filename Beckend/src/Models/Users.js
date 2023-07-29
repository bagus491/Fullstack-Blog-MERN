//model users
const mongoose = require('mongoose')


const UserScheama  = new mongoose.Schema({
    Username: String,
    Password: String,
    Email: String,
})


const users = mongoose.model('users', UserScheama)


module.exports = users