//mongoose
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    Username:String,
    Title:String,
    Preparagraf: String,
    Paragraf: String,
    Author:String,
    PostDate: String,
})

const posts = mongoose.model('posts',PostSchema)


module.exports = posts