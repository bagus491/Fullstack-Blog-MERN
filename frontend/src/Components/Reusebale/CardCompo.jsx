import { Card,Button } from "react-bootstrap"
import {useNavigate, useParams} from 'react-router-dom'
export const CardCompo  = ({NameCard,bodyName,ImgPost,TitlePost,Preparagraf,id,PostDate,}) => {
    const {Username} = useParams()
    const Navigate = useNavigate()
    return(
        <>
        <Card className={NameCard}>
      <Card.Body className={bodyName}>

        <div className="cardImg">
      <Card.Img variant="top" src={ImgPost} className="cardImg-Img" />
        </div>

        <div className="card-details">

        <div className="sub-details">
        <Card.Title>{TitlePost}</Card.Title>
        <p style={{fontSize: '10px'}}>{PostDate}</p>

        <div className="hoverbar"></div>
        <p>{Preparagraf}</p>

        <div className="button-space-card" style={{display: 'flex',justifyContent: 'space-evenly', marginBottom: '10px'}}>
        <Button onClick={() => Navigate(`/readblog/${Username}/${id}`)} variant="secondary">&laquo; ReadBlog</Button>
        <Button variant="info" onClick={() => Navigate(`/updatepost/${Username}/${id}`)}>Update</Button>
        <Button variant="danger">Delete</Button>
        </div>
    
            </div>
        </div>
      </Card.Body>
    </Card>
        </>
    )
}