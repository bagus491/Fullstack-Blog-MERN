


//first
const HomeWeb = (req,res) => {
    try{
        res.send('hello world')
    }catch{
        res.send('hello world')
    }   
}

//seconds
const HomeSearch = (req,res) => {
    try{
        res.send('hello world search')
    }catch{
        res.send('hello world')
    }
}

//third
const LoginPages = (req,res) => {
    try{
        res.send('hello world login')
    }catch{
        res.send('hello world')
    }
}



module.exports = {HomeWeb,HomeSearch,LoginPages}