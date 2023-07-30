import { useEffect, useState } from "react"
import {AuthContext} from '../AuthContext'
import { useContext } from "react"
import { ListPostsCompo } from "../Components/Sub-Compo/ListPostsCompo"

export const ListPosts = () => {
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
        getContent ? <ListPostsCompo /> : <div><h1>Anda Tidak Punya Akses</h1></div>
      }
        </>
    )
}