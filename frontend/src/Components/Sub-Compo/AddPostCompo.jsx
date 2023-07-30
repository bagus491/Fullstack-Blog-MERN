import { useEffect, useState } from "react"
import {Spinner} from 'react-bootstrap'
import {Navigation} from '../Reusebale/Navigation'
import { useParams } from "react-router-dom"

export const AddPostCompo = () => {
    const [getSpinner, setgetSpinner] = useState()
    const getToken = localStorage.getItem('uL_')
    const {Username} = useParams()
    
    useEffect(() => {

    },[getToken])
    return(
        <>
        <h1>tester</h1>
        </>
    )
}