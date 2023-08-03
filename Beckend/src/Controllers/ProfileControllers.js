//getProfile
const {GetProfile,CheckUser,NewProfile}  = require('../Utils/Index')

// middleware
const jwt = require('jsonwebtoken')
const secret = '!@#%$^&daqwerg!@234551'

//Profile
const ProfileData = async (req,res) => {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg: 'Not Authorization'})
        }
        
        jwt.verify(token,secret,async (err,decoded) => {
            if(err){
                return res.status(401).json({msg: 'Not Authorization'})
            }

            const dataOk = await CheckUser(req.params.Username)
            const decodedUser = decoded.Username
            if(!dataOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            if(dataOk.Username !== decodedUser){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            const Profile = await GetProfile(decodedUser)
            if(!Profile){
                return res.status(204).json({msg: 'no Content'})
            }
            
            const imageUrL = Profile.ImageProfileFile.toString('base64')
            const imageSrc = `data:${Profile.ImageProfileType};base64,${imageUrL}`
            const data = {imageSrc,yb: Profile.YourJob}
            res.status(200).json({msg : 'valid',data})
        })
        
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

//PostProfile
const PostProfile = async (req,res) => {
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        jwt.verify(token,secret,async(err,decoded) => {
            if(err){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            const dataOk = await CheckUser(req.params.Username)
            const decodedUser = decoded.Username

            if(!dataOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            if(dataOk.Username !== decodedUser){
                return res.status(401).json({msg : 'Not Authorization'})
            }
            const {YourJob} = req.body
            const postNew  = NewProfile(decodedUser,YourJob,req.file)
            const savePost = await postNew.save()
            if(savePost){
               res.status(201).json({msg : 'Success Post'})
            }
        })
    }catch(error) {
        res.status(500).json({msg : 'Internal Server Error'})
    }
}


module.exports = {ProfileData,PostProfile}