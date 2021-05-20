import { Image, Modal } from "semantic-ui-react"

const BackDrop = ({ImageSource, show,closeModal}) => {
    return (
        
        <Modal onClick={closeModal} open={show} style={{width:'100%',height:'100%'}}>
        <Modal.Content>
        <Image src={ImageSource} />
        </Modal.Content>
        <Modal.Actions>
        
        </Modal.Actions>
        </Modal>
        
    )
}
export default BackDrop