//mongoose
const mongoose = require('mongoose')


const ProfileSchema = new mongoose.Schema({
    Username:String,
    YourJob:String,
    ImageProfileName:String,
    ImageProfileFile:Buffer,
    ImageProfileType:String
})


const profiles = mongoose.model('profiles',ProfileSchema)


module.exports = profiles