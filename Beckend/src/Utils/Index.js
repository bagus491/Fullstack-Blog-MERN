//model Users
const Users = require('../Models/Users')

const UsersNew = (Username,Password,Email) => {
    return new Users({
        Username,
        Password,
        Email
    })
} 



module.exports = {UsersNew}