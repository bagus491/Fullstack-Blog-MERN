import { useState } from "react"
import { Modal ,Button} from "react-bootstrap"
import {useParams} from 'react-router-dom'

export const ModalCard = ({show,handleClose}) => {
      const [YourJob, setYourJob] = useState('')
      const [Avatar ,setAvatar] = useState('')
      const getToken = localStorage.getItem('uL_')
      const {Username} = useParams()  

      const getData = async (e) => {
          e.preventDefault()
          const formData = new FormData()
              formData.append('YourJob',YourJob)
              formData.append('Avatar',Avatar[0])
          try{
            const respone = await fetch(`http://localhost:5000/profile/${Username}`,{
              method: 'post',
              body : formData,
              headers: {
                'Authorization' : getToken
              }
            })
            if(!respone.ok){
              console.log({msg : 'Error'})
              alert('gagal')
            }

            const json = await respone.json()
            alert(json.msg)
            document.location.reload()
          }catch{
            console.error({msg : 'Error'})
          }
      }

    return(
        <>
         <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Form AddProfile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={getData}>
            <div className="form-modal" style={{display: 'flex', flexDirection: 'column'}}>
                    <label>YourJob:</label>
                    <input type="text"
                    name="YourJob"
                    onChange={(e) => setYourJob(e.target.value)}
                    required
                    ></input>
                </div>
                <br></br>
                <div className="form-modal" style={{display: 'flex', flexDirection: 'column'}}>
                    <label>FotoProfile:</label>
                    <input type="file"
                      name="Avatar"
                      onChange={(e) => setAvatar(e.target.files)}
                      required
                    ></input>
                </div>
                <br></br>
                <Button type="submit">Submit</Button>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}