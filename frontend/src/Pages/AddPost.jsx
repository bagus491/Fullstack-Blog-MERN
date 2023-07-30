import { useContext, useEffect, useState } from "react"
import {AuthContext} from '../AuthContext'
import { AddPostCompo } from "../Components/Sub-Compo/AddPostCompo"

export const AddPost = () => {
    const {UserInfo} = useContext(AuthContext)
    const getToken = localStorage.getItem('uL_')
    const [getContent, setgetContent] = useState()

    useEffect(() => {
        if(!getToken || !UserInfo){
            setgetContent(false)
        }else{
            setgetContent(true)
        }
    },[getToken,UserInfo])
    return(
        <>
      {
        getContent ? <AddPostCompo /> : <div><h1>Anda Tidak Punya Akses</h1></div>
      }
        </>
    )
}