
import { AuthContext } from "../AuthContext"
import { useContext, useEffect, useState } from "react"
import { DasbordCompo } from "../Components/Sub-Compo/DasbordCompo"

export const DasbordPages = () => {
    const [getContent , setgetContent] = useState()
    const getToken = localStorage.getItem('uL_')
    const {UserInfo} = useContext(AuthContext)

    useEffect(() => {
        if(!getToken || !UserInfo){
            setgetContent(false)
        }else {
            setgetContent(true)
        }
    },[getToken,UserInfo])

    return(
        <>
       {
        getContent ?  <DasbordCompo /> : <div><h1>Anda Tidak Punya Akses</h1></div>
       }
        </>
    )
}