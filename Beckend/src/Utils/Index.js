//model Users
const { check } = require('express-validator')
const Users = require('../Models/Users')

//model Profile
const Profile = require('../Models/Profiles')

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

module.exports = {UsersNew,CheckUserNew,CheckUser,GetProfile}