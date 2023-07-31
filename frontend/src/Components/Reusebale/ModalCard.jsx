import { Modal ,Button} from "react-bootstrap"

export const ModalCard = ({show,handleClose}) => {
    return(
        <>
         <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Form AddProfile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
            <div className="form-modal" style={{display: 'flex', flexDirection: 'column'}}>
                    <label>YourJob:</label>
                    <input type="text"></input>
                </div>
                <br></br>
                <div className="form-modal" style={{display: 'flex', flexDirection: 'column'}}>
                    <label>FotoProfile:</label>
                    <input type="file"></input>
                </div>
                <br></br>
                <Button>Submit</Button>
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