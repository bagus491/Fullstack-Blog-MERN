
import { useEffect, useState } from "react"
import { Navigation } from "../Components/Reusebale/Navigation"
// import { Spinner} from 'react-bootstrap'
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
                        <Navigation  />
                    </div>
                    
                }

            </div>
        </div>
    )
}