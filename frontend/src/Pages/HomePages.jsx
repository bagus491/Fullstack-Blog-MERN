
import { useEffect, useState } from "react"
import { HomeCompo } from "../Components/Sub-Compo/HomeCompo"

import '../Sass/main.css'


export const HomePages = () => {
    const [getContent , setgetContent] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setgetContent(false)
        },4000)
    },[])

    return(
        <div>
            <div className='mybghomedark'>
                {
                    getContent ? 
                    <div className="spinner-animation">
                       <div className="box-animation">
                        <div className="text-box-animation">
                            <h1>Loading</h1>
                        </div>
                       </div>
                    </div>
                    : 
                    <div>
                      <HomeCompo />
                    </div>
                    
                }

            </div>
        </div>
    )
}