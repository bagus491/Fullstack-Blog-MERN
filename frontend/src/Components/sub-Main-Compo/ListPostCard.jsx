import { useState,useEffect } from "react"
import {useParams, useNavigate} from 'react-router-dom'
import {Container, Spinner} from 'react-bootstrap'
import '../../Sass/main.css'
import { CardCompo } from "../Reusebale/CardCompo"

export const ListPostCard = () => {
    const [getSpinner , setgetSpinner] = useState(false)
    const [getContent , setgetContent] = useState()
    const [getLastPost, setgetLastPost] = useState()
    const getToken = localStorage.getItem('uL_')
    const {Username} = useParams()
    const Navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            try{
                const respone = await fetch(`http://localhost:5000/listposts/card/${Username}`,{
                    method: 'GET',
                    headers: {
                        'Authorization': getToken
                    }
                })

                if(!respone.ok){
                    Navigate('*')
                    return false
                }

                if(respone.status !== 200){
                    setgetContent(false)
                    return false
                }

                const json = await respone.json()
                //dataArray
                const jsonArray = json.data
                
                //getlastIndex
                const LastPosts = jsonArray[jsonArray.length - 1]
                setgetLastPost(LastPosts)
                const postData = jsonArray.filter((value) => value.Title!== LastPosts.Title)
                setgetContent(postData)
                setgetSpinner(true)
            }catch{
                console.error({msg : 'Error'})
            }
        }
        getData()
    },[getToken,Navigate,Username])
    return(
        <>
        {
            getSpinner ?  
            <div>
                {
                    getContent ?  
                    <Container>
                    <div className="bgforCard">
                        <div className="flex-card">
                        <div className="LastPostCard">
                            <h2>LastPost</h2>
                            <CardCompo NameCard={'CardLastpost'} bodyName={'cardBody'} ImgPost={getLastPost.ImagePath} TitlePost={getLastPost.Title} PostDate={getLastPost.PostDate} Preparagraf={getLastPost.Preparagraf} Author={getLastPost.Author} id={getLastPost._id}/>
                        </div>
                        <div className="listCard">
                          {
                            getContent ?  getContent.map((e) => (
                                <CardCompo  NameCard={'CardMany'} bodyName={'cardBody'} ImgPost={e.ImagePath} TitlePost={e.Title} PostDate={e.PostDate} Preparagraf={e.Preparagraf} Author={e.Author} id={e._id} key={e._id}/>
                            )) : <div></div>
                          }
                        </div>
                        </div>
                    </div> 
                    </Container>
                    : 
                    <div className="text-center"> <h1>didnt Found Posts</h1></div>
                }
            </div>
             : 
                <div className="spinner-HomeCompo">
                <Spinner animation="grow" variant="info" />
                </div>
        }
        </>
    )
}