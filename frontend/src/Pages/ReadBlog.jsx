import { useEffect, useState } from "react"
import {AuthContext} from '../AuthContext'
import { useContext } from "react"
import { ReadBlogCompo } from "../Components/Sub-Compo/ReadBlogCompo"

export const ReadBlogPages = () => {
    const [getContent, setgetContent] = useState()
    const getToken = localStorage.getItem('uL_')
    const {UserInfo} = useContext(AuthContext)

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
        getContent ? <ReadBlogCompo /> : <div><h1>Anda Tidak Punya Akses</h1></div>
      }
        </>
    )
}