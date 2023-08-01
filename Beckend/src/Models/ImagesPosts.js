//mongoose
const mongoose = require('mongoose')


const ImageSchema = new mongoose.Schema({
    Username:String,
    Title:String,
    Author:String,
    ImageName:String,
    ImageFile:Buffer,
    ImageType:String,
})


const imagesposts = mongoose.model('imagesposts',ImageSchema)

module.exports = imagesposts