
import { useEffect, useState } from "react"
import { Navigation } from "../Reusebale/Navigation"
import { Spinner} from 'react-bootstrap'

import '../../Sass/main.css'

export const HomeCompo = () => {
    const [GetBlog, setGetBlog] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setGetBlog(true)
        },1000)
    },[])
    return(
        <>
        <Navigation />
        {
            GetBlog ? <h1>tester</h1> : 
            <div className="spinner-HomeCompo">
                <Spinner animation="grow" variant="light" />
            </div>
        }
        </>
    )
}