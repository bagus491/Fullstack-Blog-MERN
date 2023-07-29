//mongoose
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    Username:String,
    Preparagraf: String,
    Paragraf: String,
    Author:String,
    PostData: String,
})

const posts = mongoose.model('posts',PostSchema)


module.exports = posts