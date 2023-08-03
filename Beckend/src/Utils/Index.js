//model Users
const { check } = require('express-validator')
const Users = require('../Models/Users')

//model Profile
const Profile = require('../Models/Profiles')

//model posts
const Posts = require('../Models/Posts')


const UsersNew = (Username,Password,Email) => {
    return new Users({
        Username,
        Password,
        Email
    })
} 

const CheckUserNew  = [check('Username').custom(async (value) => {
    // check duplikat
    const duplikat = await Users.findOne({Username:value})
    if(duplikat){
        throw new Error('Username Telah Tersedia')
    }else{
        return true
    }
}),
check('Password').isLength({min: 5}).withMessage('Panjang Password Min 5'),
check('Email').isEmail().withMessage('Email Tidak Valid'),
];

//checkusers == dataok
const CheckUser = async (Username) => {
    return await Users.findOne({Username})
}

//getProfiles
const GetProfile = async (Username) => {
    return await Profile.findOne({Username})
}

//newobjectProfile
const NewProfile = (Username,YourJob,file) => {
    return new Profile({
        Username,
        YourJob,
        ImageProfileName: file.filename,
        ImageProfileFile: file.buffer,
        ImageProfileType: file.mimetype
    })
}

//newPosts

const NewPost = (Username,Title,Preparagraf,Paragraf,Author,PostDate,file) => {
    return new Posts({
        Username,
        Title,
        Preparagraf,
        Paragraf,
        Author,
        PostDate,
        ImageName: file.filename,
        ImageFile:file.buffer,
        ImageType: file.mimetype,
    })
}

//checkPosts
const CheckPosts = async (Title) => {
    return await Posts.findOne({Title})
}

// getPostsbyid 
const CheckPostsByid = async(id) => {
    return await Posts.findOne({_id: id})
}

//updateblog
const UpdateBlog = async (id,Username,Title,Preparagraf,Paragraf,Author,PostDate,file) => {
    return await Posts.updateOne(
        {
            _id : id
        },
        {
            $set: {
                Username,
                Title,
                Preparagraf,
                Paragraf,
                Author,
                PostDate,
                ImageName: file.filename,
                ImageFile:file.buffer,
                ImageType: file.mimetype,
            }
        }
    )
}

//deletePost
const DeleteBlog = async(id) => {
    return await Posts.deleteOne({_id: id})
}

//listPost
const GetListPost = async () => {
    return await Posts.find()
}



module.exports = {UsersNew,CheckUserNew,CheckUser,GetProfile,NewProfile,NewPost,CheckPosts,GetListPost,CheckPostsByid,UpdateBlog,DeleteBlog}